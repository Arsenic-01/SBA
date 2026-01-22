'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Bitter } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { Trophy, Plus, ZoomIn } from 'lucide-react';
import MediaLightbox, {
  ActiveMediaState,
  GalleryMedia,
} from '@/components/MediaLightbox';

const bitter = Bitter({ subsets: ['latin'] });

type AwardItem = {
  title: string;
  event: string;
  year: string;
  images: string[];
};

const awardsData: AwardItem[] = [
  {
    title: 'Best Chartered Architectural Engineer Award',
    event: '29th National Convention of Architectural engineers',
    year: '2014',
    images: [
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108260/8371e625-d0fc-435b-a891-46ca4e437cd5_ex5ksw.jpg`,
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108244/tie_india_fz68u5.jpg`,
    ],
  },
  {
    title: 'Dedication & Participation in PVAI Activities Award',
    event: 'All India Conference of PVAI, Nagpur',
    year: '2017',
    images: [
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108261/504ce663-e164-4713-9b3e-d45037b9140d_fmsudm.jpg`,
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108245/president_flhziq.jpg`,
    ],
  },
  {
    title: 'IIA Nirmiti Lifetime Achievement Award',
    event: 'IIA Nashik Center',
    year: '2022',
    images: [
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108261/95572fba-3d14-46e1-bdb9-bb1f33c0e297_o8sqrw.jpg`,
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108242/iia_nirmiti_dy7zl3.jpg`,
    ],
  },
  {
    title: 'V20 Valuation Summit Award',
    event: 'V20 Summit & Conference, New Delhi',
    year: '2020',
    images: [
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108479/5c55b69a-ba61-4d74-a58b-1b45ca09fc84_nbrv5c.jpg`,
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108243/v20_jfndcz.jpg`,
    ],
  },
  {
    title: 'Promoter Member Award',
    event: 'Silver Jubilee & Foundation Day Celebration, PVAI, Thane',
    year: '2024',
    images: [
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108261/39250680-007f-4f51-9504-97e477262e3c_g7rd89.jpg`,
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108245/silver_jublee_nzkquy.jpg`,
    ],
  },

  {
    title: 'P.V.A.I President Award',
    event: 'Architects & Engineers Association, Nashik',
    year: '2023',
    images: [
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108261/6e8cf18f-5c57-47e0-92f1-defe2d436ad8_ka6rxf.jpg`,
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108244/president_pva_okpssh.jpg`,
    ],
  },
  {
    title: 'Distinguished Speaker Award',
    event: '1st Anniversary of PVAI Jalgaon Center',
    year: '2025',
    images: [
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108244/pvai_jalgoan_a3cmzv.jpg`,
    ],
  },
  {
    title: 'National President, PVAI Appreciation Award',
    event:
      'Association of Consulting Civil Engineers, (India), Chandwad Center',
    year: '2024',
    images: [
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108244/chandwad_iacro8.jpg`,
    ],
  },
  {
    title: 'Engineering Acheivement Award',
    event: 'Institution of Engineers (India) Nashik Center',
    year: '2025',
    images: [
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108243/aea_2025_eyiuvh.jpg`,
    ],
  },
  {
    title: 'Structural Consultant Appreciation Award',
    event: 'ACCE, Nashik - Ultratech Awards - 2018',
    year: '2018',
    images: [
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108245/structural_consultant_qhv0st.jpg`,
    ],
  },
  {
    title: 'National CEP Workshop Participation Award',
    event: 'National CEP Workshop on Income Tax Valuation',
    year: '2023',
    images: [
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108244/income_tax_rmimgi.jpg`,
    ],
  },
  {
    title: 'Inauguration of PVAI Nashik Center',
    event: '26th Continueing Education Program, PVAI Nashik Center',
    year: '2025',
    images: [
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108242/pvai_cep_cyh07b.jpg`,
    ],
  },
  {
    title: 'Appreciation Award',
    event: 'PVAI Coimbatore Center',
    year: '2025',
    images: [
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108242/pvai_rejavd.jpg`,
    ],
  },
  {
    title: 'Appreciation Award',
    event: 'Association of Consulting Civil Engineers, (India), Nashik Center',
    year: '2024',
    images: [
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108245/acee_i_folyic.jpg`,
    ],
  },

  {
    title: 'Architectural Consultant Appreciation Award',
    event: 'ACCE, Nashik - Ultratech Awards - 2018',
    year: '2018',
    images: [
      `https://res.cloudinary.com/dmdci86wv/image/upload/v1769108245/architectural_consultant_llwot6.jpg`,
    ],
  },
];

export default function AwardsPage() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [lightboxState, setLightboxState] = useState<ActiveMediaState | null>(
    null
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const openAwardGallery = (award: AwardItem) => {
    const galleryItems: GalleryMedia[] = award.images.map((src, index) => ({
      src: src,
      alt: `${award.title} - View ${index + 1}`,
      type: 'image',
    }));

    setLightboxState({
      gallery: galleryItems,
      index: 0,
    });
  };

  return (
    <div className='relative min-h-screen lg:py-28 py-24 w-full bg-black overflow-hidden flex flex-col items-center'>
      <div className='relative z-10 w-full max-w-6xl px-6 lg:px-8'>
        <div className='flex flex-col items-center text-center mb-16'>
          <div className='flex items-center gap-3 mb-4'>
            <span className='h-[1px] w-6 bg-red-500'></span>
            <span className='text-red-500 font-semibold tracking-widest uppercase text-xs'>
              Hall of Fame
            </span>
            <span className='h-[1px] w-6 bg-red-500'></span>
          </div>

          <h1
            className={`${bitter.className} text-3xl md:text-4xl text-white font-medium mb-4`}
          >
            Awards & <span className='text-neutral-500'>Recognitions.</span>
          </h1>

          <p className='text-neutral-400 max-w-xl text-sm leading-relaxed'>
            Honoring our commitment to precision, integrity, and excellence.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {awardsData.slice(0, visibleCount).map((award, index) => (
            <div
              key={index}
              onClick={() => openAwardGallery(award)}
              className='group relative cursor-pointer flex flex-col'
            >
              <div className='relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-colors duration-500 group-hover:border-red-500/30'>
                <Image
                  src={award.images[0]} // Thumbnail only
                  alt={award.title}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100'
                />

                <div className='absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

                <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  <div className='rounded-full bg-white/10 p-3 backdrop-blur-sm border border-white/20 shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300'>
                    <ZoomIn className='text-white h-5 w-5' />
                  </div>
                </div>

                <div className='absolute top-3 right-3'>
                  <span className='inline-flex items-center justify-center rounded-full bg-red-600/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white shadow-lg border border-red-500/20'>
                    {award.year}
                  </span>
                </div>
              </div>

              <div className='mt-4 space-y-1 px-1'>
                <div className='flex items-center gap-2 mb-1.5'>
                  <Trophy className='h-3 w-3 text-red-500' />
                  <span className='text-[10px] font-bold text-red-500 uppercase tracking-wider'>
                    Winner
                  </span>
                </div>
                <h3
                  className={`${bitter.className} text-lg text-white font-medium group-hover:text-red-400 transition-colors duration-300`}
                >
                  {award.title}
                </h3>
                <p className='text-xs text-neutral-500 font-light'>
                  {award.event}
                </p>

                {award.images.length > 1 && (
                  <div className='flex items-center gap-1.5 mt-2'>
                    <div className='flex -space-x-1.5'>
                      <div className='w-4 h-4 rounded-full bg-neutral-800 border border-black' />
                      <div className='w-4 h-4 rounded-full bg-neutral-700 border border-black' />
                    </div>
                    <p className='text-[10px] text-neutral-600 font-medium'>
                      +{award.images.length - 1} photos
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {visibleCount < awardsData.length && (
          <div className='mt-16 flex justify-center'>
            <Button
              onClick={handleLoadMore}
              variant='outline'
              className='rounded-full border-neutral-800 bg-transparent px-8 py-5 text-neutral-400 text-sm hover:text-white hover:border-red-500/50 hover:bg-neutral-900 transition-colors duration-300'
            >
              <Plus className='mr-2 h-4 w-4' />
              Load More
            </Button>
          </div>
        )}
      </div>

      <MediaLightbox
        activeMedia={lightboxState}
        onClose={() => setLightboxState(null)}
      />
    </div>
  );
}
