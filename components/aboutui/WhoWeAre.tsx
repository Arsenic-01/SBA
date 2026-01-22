'use client';

import { Bitter } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import OurTeam from './OurTeam';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  FileText,
  Play,
  Quote,
  ShieldCheck,
  Target,
} from 'lucide-react';
import MediaLightbox, {
  ActiveMediaState,
  GalleryMedia,
} from '@/components/MediaLightbox';

const bitter = Bitter({ subsets: ['latin'] });

const brochures = [
  {
    id: '1',
    name: 'Consultancy_Brochure_2025.pdf',
    size: '846.9 KB',
    date: 'Jan 22, 2026',
    url: 'https://drive.google.com/file/d/16REwXjaCwLsSbQybi3fC7E88sqjR5VPt/view?usp=sharing',
  },
  {
    id: '2',
    name: 'Valuation_Brochure_2025.pdf',
    size: '586.6 KB',
    date: 'Jan 22, 2026',
    url: 'https://drive.google.com/file/d/15N_m1EhqYRIiqa4Sg54zKpFDSSY61Kjh/view?usp=sharing',
  },
];

const galleryItems: GalleryMedia[] = [
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769116030/entrance_fe0zbs.webp',
    alt: 'Entrance View 1',
    type: 'image',
  },
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769116028/entrance1_uml5de.webp',
    alt: 'Entrance View 2',
    type: 'image',
  },
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769116028/broad_aubizu.webp',
    alt: 'Sitting Area View 1',
    type: 'image',
  },
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769116028/main1_sshfnj.webp',
    alt: 'Sitting Area View 2',
    type: 'image',
  },
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769116029/offic2_pecvfh.webp',
    alt: 'Discussion Area',
    type: 'image',
  },
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769116030/office_ztqzmw.webp',
    alt: 'Workstation Area',
    type: 'image',
  },
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769116029/awards_ky0h0v.webp',
    alt: 'Award Display',
    type: 'image',
  },
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769116028/main_ggp9l3.webp',
    alt: 'Main Office',
    type: 'image',
  },
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769116028/awardss_hqwkkj.jpg',
    alt: 'Award Display 2',
    type: 'image',
  },
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769117353/unnamed_lrlrhu.webp',
    alt: 'Conference Room View 1',
    type: 'image',
  },
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769116028/conference_c8tuyy.webp',
    alt: 'Conference Room View 2',
    type: 'image',
  },
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769117402/IMG_20190727_200033_vxj1kx.webp',
    alt: 'Birthday Celebration',
    type: 'image',
  },
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769116029/outside_p9y0jh.webp',
    alt: 'Outside View',
    type: 'image',
  },
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769117568/20210602_133234_oslsvy.webp',
    alt: 'Pernod Ricard Project',
    type: 'image',
  },
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769117578/2020-09-15_y4ufru.webp',
    alt: 'Pernod Ricard Project 2',
    type: 'image',
  },
  {
    src: 'https://res.cloudinary.com/dmdci86wv/image/upload/v1769117580/2021-06-23_dkh75p.webp',
    alt: 'ESR Water Supply Project',
    type: 'image',
  },
];

const INITIAL_VISIBLE_COUNT = 8;

const WhoWeAre = () => {
  const [activeGallery, setActiveGallery] = useState<ActiveMediaState | null>(
    null
  );
  const [visibleGalleryCount, setVisibleGalleryCount] = useState(
    INITIAL_VISIBLE_COUNT
  );

  const handleShowMoreGallery = () => {
    setVisibleGalleryCount((prev) => prev + 4);
  };

  return (
    <section className='relative w-full overflow-hidden text-neutral-200'>
      <div className='relative mx-auto max-w-6xl px-6 lg:px-8 z-10'>
        <div className='mb-12'>
          <h2 className='text-red-500 font-semibold tracking-widest uppercase text-xs mb-3 flex items-center gap-2'>
            <span className='w-8 h-[1px] bg-red-500'></span>
            About The Firm
          </h2>
          <h1
            className={`${bitter.className} text-3xl md:text-4xl text-white font-medium`}
          >
            Precision in Valuation. <br />
            <span className='text-neutral-500'>Excellence in Engineering.</span>
          </h1>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24'>
          <div className='lg:col-span-7 space-y-8'>
            <div className='space-y-6 text-neutral-300 text-base leading-relaxed'>
              <p>
                <strong className='text-white'>Sunil Bhor & Associates</strong>{' '}
                is a premier consultancy firm delivering comprehensive solutions
                in valuation, certification, and industrial compliance. With
                over 25 years of experience, we bridge the gap between technical
                assessment and financial decision-making.
              </p>
              <p>
                We are driven by a singular mission: to be the most reliable and
                respected firm for valuation. Whether serving banks, corporate
                entities, or legal institutions, our approach is defined by
                strict confidentiality, ethical practice, and data-driven
                methodology.
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='bg-neutral-900/50 border border-neutral-800 p-4 rounded-lg'>
                <div className='flex items-center gap-3 mb-2'>
                  <Target className='text-red-500 h-5 w-5' />
                  <h3 className='text-white font-medium text-sm'>
                    Our Mission
                  </h3>
                </div>
                <p className='text-neutral-400 text-xs leading-relaxed'>
                  To enable transparent, fair, and compliant decision-making
                  across all industries.
                </p>
              </div>
              <div className='bg-neutral-900/50 border border-neutral-800 p-4 rounded-lg'>
                <div className='flex items-center gap-3 mb-2'>
                  <ShieldCheck className='text-red-500 h-5 w-5' />
                  <h3 className='text-white font-medium text-sm'>
                    Our Promise
                  </h3>
                </div>
                <p className='text-neutral-400 text-xs leading-relaxed'>
                  Confidentiality, professionalism, and industry-leading
                  accuracy in every report.
                </p>
              </div>
            </div>

            <div className='pt-2'>
              <DialogDemo />
            </div>
          </div>

          <div className='lg:col-span-5'>
            <div className='relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden p-6 hover:border-red-500/30 transition-colors duration-300'>
              <div className='flex items-start gap-5 mb-6'>
                <div className='relative h-20 w-20 shrink-0 rounded-full overflow-hidden border-2 border-neutral-700'>
                  <Image
                    src='/person1.png'
                    alt='Mr. Sunil D. Bhor'
                    width={80}
                    height={80}
                    className='object-cover'
                  />
                </div>
                <div>
                  <span className='inline-block px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[10px] font-semibold border border-red-500/20 mb-2 uppercase tracking-wide'>
                    Founder
                  </span>
                  <h3
                    className={`${bitter.className} text-xl text-white font-bold`}
                  >
                    Mr. Sunil D. Bhor
                  </h3>
                  <p className='text-neutral-400 text-xs mt-1 leading-snug'>
                    M. Tech (Civil), FIE(Arch), FIV, FM.ACCE, PM.PVAI, MICA
                    Architectural Engineering Consultant & Govt. Regd Valuer
                    [IBBI & CCIT]
                  </p>
                </div>
              </div>

              <div className='h-px w-full bg-neutral-800 mb-6' />

              <div className='space-y-4'>
                <h4 className='text-[10px] font-bold text-neutral-500 uppercase tracking-widest'>
                  Professional Leadership
                </h4>

                <ul className='space-y-3'>
                  {[
                    {
                      role: 'Past National President',
                      org: 'Practising Valuers Association of India',
                    },
                    {
                      role: 'Past National Council Member',
                      org: 'Institution of Engineers (India)',
                    },
                    {
                      role: 'Past Chairman',
                      org: 'Institution of Valuers (India), Nashik Branch',
                    },
                  ].map((item, i) => (
                    <li key={i} className='flex gap-3 items-start'>
                      <CheckCircle2
                        className='text-red-500 mt-0.5 shrink-0'
                        size={14}
                      />
                      <div>
                        <p className='text-neutral-200 text-sm font-medium leading-none'>
                          {item.role}
                        </p>
                        <p className='text-neutral-500 text-xs mt-1'>
                          {item.org}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='mt-6 pt-4 border-t border-neutral-800 flex gap-3 opacity-80'>
                <Quote className='text-red-500 shrink-0' size={16} />
                <p className='text-neutral-400 text-xs italic leading-relaxed'>
                  "Innovating valuation to unlock real value and meaningful
                  impact."
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='mb-24'>
          <h2 className='text-xl font-semibold text-white mb-6 px-1 border-l-4 border-red-500 pl-4'>
            Company Brochures
          </h2>
          <div className='rounded-xl border border-[#353535] bg-neutral-900/50 overflow-hidden'>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader className='bg-[#141414]'>
                  <TableRow className='border-[#353535] hover:bg-transparent'>
                    <TableHead className='text-neutral-400 min-w-[200px]'>
                      Document
                    </TableHead>
                    <TableHead className='text-neutral-400 whitespace-nowrap'>
                      Date
                    </TableHead>
                    <TableHead className='text-neutral-400 hidden sm:table-cell'>
                      Size
                    </TableHead>
                    <TableHead className='text-right text-neutral-400 whitespace-nowrap'>
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brochures.map((doc) => (
                    <TableRow
                      key={doc.id}
                      className='border-[#353535] hover:bg-[#141414] transition-colors group'
                    >
                      <TableCell className='font-medium text-neutral-200'>
                        <div className='flex items-center gap-3'>
                          <div className='flex-shrink-0 flex h-8 w-8 items-center justify-center rounded bg-[#1f1f1f] border border-[#353535] text-blue-400'>
                            <FileText className='h-4 w-4' />
                          </div>
                          <span
                            className='truncate max-w-[150px] sm:max-w-[250px] md:max-w-none'
                            title={doc.name}
                          >
                            {doc.name.replace(/_/g, ' ')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className='text-neutral-400 whitespace-nowrap'>
                        <div className='flex items-center gap-2 text-xs sm:text-sm'>
                          <Calendar className='h-3.5 w-3.5' />
                          {doc.date}
                        </div>
                      </TableCell>
                      <TableCell className='text-neutral-400 hidden sm:table-cell'>
                        <span className='text-xs px-2 py-1 rounded border border-[#353535]'>
                          {doc.size}
                        </span>
                      </TableCell>
                      <TableCell className='text-right'>
                        <Button
                          asChild
                          variant='outline'
                          size='sm'
                          className='border-[#353535] hover:bg-[#252525] hover:text-white'
                        >
                          <a href={doc.url} download target='_blank'>
                            <span className='hidden sm:inline'>View</span>
                            <ArrowUpRight className='h-4 w-4 sm:ml-2' />
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div>
          <h2 className='text-xl font-semibold text-white mb-6 px-1 border-l-4 border-red-500 pl-4'>
            Gallery
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {galleryItems.slice(0, visibleGalleryCount).map((media, index) => (
              <div
                key={index}
                className='group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-[#353535] bg-neutral-900'
                onClick={() =>
                  setActiveGallery({ gallery: galleryItems, index })
                }
              >
                {media.type === 'image' ? (
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                ) : (
                  <>
                    <video
                      src={media.src}
                      muted
                      playsInline
                      className='h-full w-full object-cover opacity-80 group-hover:opacity-60 transition-opacity'
                    />
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <div className='rounded-full bg-white/20 p-3 backdrop-blur-sm transition-transform group-hover:scale-110'>
                        <Play className='h-6 w-6 text-white fill-white' />
                      </div>
                    </div>
                  </>
                )}

                <div className='absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20' />
                <div className='absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/80 to-transparent'>
                  <p className='text-sm font-medium text-white truncate'>
                    {media.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {visibleGalleryCount < galleryItems.length && (
            <div className='mt-8 flex justify-center'>
              <Button
                variant='outline'
                onClick={handleShowMoreGallery}
                className='border-neutral-700 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white px-8'
              >
                Show More
                <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </div>
          )}
        </div>
      </div>

      <MediaLightbox
        activeMedia={activeGallery}
        onClose={() => setActiveGallery(null)}
      />
    </section>
  );
};

export default WhoWeAre;

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='rounded-full border-neutral-700 bg-transparent text-neutral-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors px-6'
        >
          View Full Team
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-7xl w-full h-[80vh] p-0 bg-neutral-950 border-neutral-800 overflow-y-auto flex flex-col text-neutral-200'>
        <DialogHeader className='px-6 lg:px-16 pt-6 pb-4 bg-neutral-950 z-10 border-b border-neutral-800'>
          <DialogTitle className='text-2xl font-semibold text-white'>
            Our Experts
          </DialogTitle>
          <DialogDescription className='text-neutral-400'>
            The dedicated professionals behind our success.
          </DialogDescription>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto p-6'>
          <OurTeam />
        </div>

        <DialogFooter className='p-4 bg-neutral-950 border-t border-neutral-800'>
          <DialogClose asChild>
            <Button
              variant='ghost'
              className='text-neutral-400 hover:text-white hover:bg-neutral-800'
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
