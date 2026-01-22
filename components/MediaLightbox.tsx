'use client';

import * as Dialog from '@radix-ui/react-dialog';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export interface GalleryMedia {
  src: string;
  alt: string;
  type: 'image' | 'video';
}
export interface ActiveMediaState {
  gallery: GalleryMedia[];
  index: number;
}

interface MediaLightboxProps {
  activeMedia: ActiveMediaState | null;
  onClose: () => void;
}

const AUTOPLAY_INTERVAL_SECONDS = 5;

const formatTime = (time: number) => {
  if (isNaN(time) || time === 0) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default function MediaLightbox({
  activeMedia,
  onClose,
}: MediaLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const imageProgress = useMotionValue(0);
  const animationControls = useRef<any>(null);

  useEffect(() => {
    if (activeMedia) {
      setCurrentIndex(activeMedia.index);
      setIsPlaying(true);
      setProgress(0);
      imageProgress.set(0);
    }
  }, [activeMedia, imageProgress]);

  const handlePrevious = useCallback(() => {
    if (!activeMedia) return;
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + activeMedia.gallery.length) %
        activeMedia.gallery.length
    );
  }, [activeMedia]);

  const handleNext = useCallback(() => {
    if (!activeMedia) return;
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % activeMedia.gallery.length
    );
  }, [activeMedia]);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    } else {
      // Toggle play for image slideshow
      setIsPlaying((prev) => !prev);
    }
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      setProgress(videoRef.current.currentTime / videoRef.current.duration);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const seekPosition = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = seekPosition * videoRef.current.duration;
    }
  };

  useEffect(() => {
    imageProgress.set(0);
  }, [currentIndex, imageProgress]);

  useEffect(() => {
    const currentMedia = activeMedia?.gallery[currentIndex];
    if (animationControls.current) animationControls.current.stop();
    if (isPlaying && activeMedia && currentMedia?.type === 'image') {
      animationControls.current = animate(imageProgress, 1, {
        duration: AUTOPLAY_INTERVAL_SECONDS * (1 - imageProgress.get()),
        ease: 'linear',
        onComplete: handleNext,
      });
    }
  }, [currentIndex, isPlaying, activeMedia, imageProgress, handleNext]);

  const hasMultipleItems = activeMedia && activeMedia.gallery.length > 1;

  const handleMediaClick = () => {
    if (
      activeMedia?.gallery[currentIndex]?.type === 'image' &&
      hasMultipleItems
    ) {
      togglePlay();
    }
  };

  // ✅ **THE FIX IS HERE**
  // This new handler checks if the video has ended. It only sets `isPlaying`
  // to false if the pause was triggered by the user, not by the video finishing.
  const handleVideoPause = () => {
    if (videoRef.current && !videoRef.current.ended) {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeMedia) return;
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrevious();
      else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMedia, handleNext, handlePrevious, togglePlay]);

  const currentMedia = activeMedia?.gallery[currentIndex];
  const imageProgressWidth = useTransform(
    imageProgress,
    (value) => `${value * 100}%`
  );

  return (
    <Dialog.Root
      open={!!activeMedia}
      onOpenChange={(isOpen) => !isOpen && onClose()}
    >
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm' />
        <Dialog.Content className='fixed left-1/2 top-1/2 z-50 w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 p-4 outline-none md:p-8'>
          <Dialog.Title className='sr-only'>
            {currentMedia?.alt || 'Media Viewer'}
          </Dialog.Title>

          <div
            className={twMerge(
              'relative aspect-video h-full w-full group',
              currentMedia?.type === 'image' &&
                hasMultipleItems &&
                'cursor-pointer'
            )}
            onClick={handleMediaClick}
          >
            {currentMedia?.type === 'image' && (
              <Image
                src={currentMedia.src}
                alt={currentMedia.alt}
                fill
                className='select-none rounded-lg object-contain'
              />
            )}
            {currentMedia?.type === 'video' && (
              <>
                <video
                  ref={videoRef}
                  key={currentMedia.src}
                  src={currentMedia.src}
                  autoPlay
                  muted={isMuted}
                  onPlay={() => setIsPlaying(true)}
                  onPause={handleVideoPause} // ✅ USE THE NEW HANDLER
                  onEnded={handleNext}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onClick={togglePlay}
                  className='h-full w-full cursor-pointer select-none rounded-lg object-contain'
                />
                <div className='absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center gap-2 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/50 to-transparent'>
                  <div
                    ref={progressRef}
                    onClick={handleSeek}
                    className='h-1.5 w-full cursor-pointer rounded-full bg-white/20'
                  >
                    <div
                      className='h-full rounded-full bg-white'
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                  <div className='flex w-full items-center justify-between'>
                    <div className='flex items-center gap-4'>
                      <button onClick={togglePlay} className='text-white'>
                        {isPlaying ? (
                          <Pause className='size-5' />
                        ) : (
                          <Play className='size-5' />
                        )}
                      </button>
                      <button onClick={toggleMute} className='text-white'>
                        {isMuted ? (
                          <VolumeX className='size-5' />
                        ) : (
                          <Volume2 className='size-5' />
                        )}
                      </button>
                    </div>
                    <span className='text-xs font-medium text-white'>
                      {formatTime(progress * duration)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          <Dialog.Close asChild>
            <button className='absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white/70 transition hover:bg-black/75 hover:text-white'>
              <X className='h-6 w-6' />
            </button>
          </Dialog.Close>

          {hasMultipleItems && (
            <>
              <button
                onClick={handlePrevious}
                className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/70 transition hover:bg-black/75 hover:text-white md:left-8'
              >
                <ChevronLeft className='h-6 w-6' />
              </button>
              <button
                onClick={handleNext}
                className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/70 transition hover:bg-black/75 hover:text-white md:right-8'
              >
                <ChevronRight className='h-6 w-6' />
              </button>

              {currentMedia?.type === 'image' && (
                <div className='absolute bottom-4 left-1/2 z-10 -translate-x-1/2'>
                  <button
                    onClick={togglePlay}
                    className='rounded-full bg-black/50 p-3 text-white/80 backdrop-blur-sm transition hover:bg-black/75 hover:text-white'
                  >
                    {isPlaying ? (
                      <Pause className='h-5 w-5' />
                    ) : (
                      <Play className='h-5 w-5' />
                    )}
                  </button>
                </div>
              )}
            </>
          )}

          {hasMultipleItems && currentMedia?.type === 'image' && (
            <div className='absolute bottom-0 left-0 right-0 h-1 bg-white/20'>
              <motion.div
                className='h-full bg-white'
                style={{ width: imageProgressWidth }}
              />
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
