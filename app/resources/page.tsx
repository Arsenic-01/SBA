'use client';

import { useState } from 'react';
import Image from 'next/image';
import React from 'react';
import { BreadcrumbWithCustomSeparator } from '@/components/OurServices';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Download,
  FileText,
  Calendar,
  Maximize2,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';

// --- Types ---
type Brochure = {
  id: string;
  name: string;
  size: string;
  date: string;
  url: string;
};

type Achievement = {
  id: string;
  title: string;
  loc: string; // Used as Category (Award vs Certification)
  type: string; // Used as Year
  description: string;
  imgSrc: string;
  pdfUrl?: string;
};

// --- 1. Data: Brochures ---
const brochures: Brochure[] = [
  {
    id: '1',
    name: 'Consultancy_Brochure_2025.pdf',
    size: '846.9 KB',
    date: 'Jan 22, 2026',
    url: 'https://fra.cloud.appwrite.io/v1/storage/buckets/6971f65800093fbc154a/files/6971f6690003b1f3c19d/view?project=67c065d100187f05a736&mode=admin',
  },
  {
    id: '2',
    name: 'Valuation_Services_Overview.pdf',
    size: '586.6 KB',
    date: 'Jan 22, 2026',
    url: 'https://fra.cloud.appwrite.io/v1/storage/buckets/6971f65800093fbc154a/files/6971f6700003c4e0e980/view?project=67c065d100187f05a736&mode=admin',
  },
];

// --- 2. Data: Awards & Certifications ---
const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Best Valuation Firm 2025',
    loc: 'Award',
    type: '2025',
    description:
      'Issued by Business Excellence Forum for outstanding performance in asset valuation.',
    imgSrc:
      'https://plus.unsplash.com/premium_photo-1714138490052-65c64d8db2e0?q=80&w=1170&auto=format&fit=crop',
    // Awards might have a PDF, but the button won't show due to logic below
    pdfUrl: '#',
  },
  {
    id: '2',
    title: 'Registered Valuer',
    loc: 'Certification',
    type: '2024',
    description:
      'Professional credential issued by IBBI demonstrating valuation expertise.',
    imgSrc:
      'https://res.cloudinary.com/dmdci86wv/image/upload/v1769079480/Screenshot_2026-01-22_161908_fqd9bf.png',
    pdfUrl:
      'https://fra.cloud.appwrite.io/v1/storage/buckets/6971f65800093fbc154a/files/ibbi/view?project=67c065d100187f05a736&mode=admin',
  },
  {
    id: '3',
    title: 'Be10x AI Certified',
    loc: 'Certification',
    type: '2024',
    description:
      'Recognized at the Global SME Summit for excellence in corporate consultancy.',
    imgSrc:
      'https://res.cloudinary.com/dmdci86wv/image/upload/v1769079480/Screenshot_2026-01-22_162005_yizubq.png',
    pdfUrl:
      'https://fra.cloud.appwrite.io/v1/storage/buckets/6971f65800093fbc154a/files/697200fb0021d10aa8b7/view?project=67c065d100187f05a736&mode=admin',
  },
];

const ResourcesPage = () => {
  const [selectedItem, setSelectedItem] = useState<Achievement | null>(null);

  const openModal = (item: Achievement) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className='flex flex-col w-full h-full py-14 sm:py-20 xl:py-6 2xl:py-12 gap-5 bg-black justify-center items-center text-neutral-200'>
      <div className='xl:max-w-5xl 2xl:max-w-6xl w-full px-4 md:px-8 mb-10'>
        <BreadcrumbWithCustomSeparator currentPage='Resources' />

        {/* --- Brochures Table --- */}
        <div className='mt-10 mb-16'>
          <h2 className='text-xl font-semibold text-white mb-6 px-1'>
            Company Brochures
          </h2>

          <div className='rounded-xl border border-[#353535] bg-black overflow-hidden'>
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
                        <Button asChild variant='outline' size='sm'>
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

        {/* --- Awards Grid --- */}
        <div>
          <h2 className='text-xl font-semibold text-white mb-6 px-1'>
            Awards & Certifications
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7'>
            {achievements.map((item) => (
              <div
                key={item.id}
                className='cursor-pointer snap-y bg-black border-[0.5px] border-[#353535] md:border-[#1f1f1f] hover:bg-[#141414] transition-all active:bg-[#1F1F1F] rounded-lg pb-3'
              >
                <div className='flex flex-col gap-4 justify-between w-full h-full'>
                  <div>
                    {/* Image Area (Thumbnail) */}
                    <div
                      className='w-full h-48 xl:h-36 2xl:h-44 relative overflow-hidden rounded-t-lg group'
                      onClick={() => openModal(item)}
                    >
                      <Image
                        src={item.imgSrc}
                        alt={item.title}
                        className='w-full h-full absolute rounded-t-lg object-cover select-none pointer-events-none'
                        width={1000}
                        height={600}
                        loading='eager'
                      />
                      <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center'>
                        <Maximize2 className='text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg' />
                      </div>
                    </div>

                    {/* Content Area */}
                    <h1 className='mt-3 text-lg lg:text-xl px-3 text-neutral-100 font-medium'>
                      {item.title}
                    </h1>

                    <div className='flex gap-2 font-semibold text-sm mt-2 flex-wrap mb-3 px-3'>
                      <div className='bg-blue-900/30 text-blue-400 border border-blue-900/50 rounded-md px-2 py-1'>
                        {item.loc}
                      </div>
                      <div className='bg-green-900/30 text-green-500 border border-green-900/50 rounded-md px-2 py-1'>
                        {item.type}
                      </div>
                    </div>

                    <p className='text-neutral-400 my-2 text-sm px-3 line-clamp-2'>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      {selectedItem && (
        <div
          className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm p-4'
          onClick={closeModal}
        >
          <div className='relative max-w-4xl w-full flex flex-col items-center justify-center'>
            {/* Full Image */}
            <div className='relative w-full h-auto max-h-[80vh] flex justify-center'>
              <Image
                src={selectedItem.imgSrc}
                alt={selectedItem.title}
                className='rounded-lg select-none object-contain max-h-[75vh] w-auto shadow-2xl'
                width={1200}
                height={800}
                quality={100}
              />
            </div>

            {/* Actions Bar */}
            <div
              className='flex items-center gap-4 mt-6'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Logic: Show button ONLY if it is a 'Certification' 
                  AND a URL exists. 
               */}
              {selectedItem.pdfUrl && selectedItem.loc === 'Certification' && (
                <Button
                  asChild
                  className='bg-white text-black hover:bg-neutral-200 rounded-full font-bold shadow-lg transition-transform hover:scale-105 px-6'
                >
                  <a
                    href={selectedItem.pdfUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <ExternalLink className='w-4 h-4 mr-2' />
                    View Official Document
                  </a>
                </Button>
              )}

              {/* Close Button */}
              <button
                className='bg-neutral-800 text-white hover:bg-neutral-700 px-4 py-2 rounded-full font-bold shadow-lg transition-colors border border-neutral-700'
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
