'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BreadcrumbWithCustomSeparator } from '@/components/OurServices';
import {
  Maximize2,
  ExternalLink,
  ShieldCheck,
  Award,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Types ---
type CertificationItem = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: 'Certification' | 'License';
  description: string;
  imgSrc: string;
  pdfUrl?: string;
};

const certificationsData: CertificationItem[] = [
  {
    id: '1',
    title: 'Registered Valuer (Land & Building)',
    issuer: 'IBBI',
    year: '2019',
    category: 'License',
    description:
      'Authorized by the Insolvency and Bankruptcy Board of India for valuation of Land and Building assets.',
    imgSrc:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop',
    pdfUrl: 'https://ibbi.gov.in/registration-certificate-mock.pdf',
  },
  {
    id: '2',
    title: 'Chartered Engineer (India)',
    issuer: 'Institution of Engineers (India)',
    year: '2008',
    category: 'Certification',
    description:
      'Professional certification recognizing engineering expertise and ethical standards.',
    imgSrc:
      'https://res.cloudinary.com/dmdci86wv/image/upload/v1769079480/Screenshot_2026-01-22_162005_yizubq.png',
    pdfUrl: '#',
  },
  {
    id: '3',
    title: 'Govt. Registered Valuer',
    issuer: 'Income Tax Dept.',
    year: '2012',
    category: 'License',
    description:
      'Registered under section 34AB of the Wealth Tax Act for official government valuations.',
    imgSrc:
      'https://images.unsplash.com/photo-1626178793926-22b28830aa30?q=80&w=1000&auto=format&fit=crop',
    pdfUrl: '#',
  },
  {
    id: '4',
    title: 'Structural Engineer License',
    issuer: 'Nashik Municipal Corporation',
    year: '2005',
    category: 'License',
    description:
      'Licensed to design and certify structural stability for high-rise buildings and industrial structures.',
    imgSrc:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop',
    pdfUrl: '#',
  },
  {
    id: '5',
    title: 'ISO 9001:2015 Certification',
    issuer: 'BSI Group',
    year: '2021',
    category: 'Certification',
    description:
      'Certified for Quality Management Systems in providing engineering consultancy services.',
    imgSrc:
      'https://res.cloudinary.com/dmdci86wv/image/upload/v1769079480/Screenshot_2026-01-22_161908_fqd9bf.png',
    pdfUrl: '#',
  },
  {
    id: '6',
    title: 'Project Management Professional',
    issuer: 'PMI',
    year: '2015',
    category: 'Certification',
    description:
      'Globally recognized certification for project management excellence and leadership.',
    imgSrc:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    pdfUrl: '#',
  },
  {
    id: '7',
    title: 'Project Management Professional',
    issuer: 'PMI',
    year: '2015',
    category: 'Certification',
    description:
      'Globally recognized certification for project management excellence and leadership.',
    imgSrc:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    pdfUrl: '#',
  },
];

const INITIAL_VISIBLE_COUNT = 6;

export default function CertificationsPage() {
  const [selectedItem, setSelectedItem] = useState<CertificationItem | null>(
    null
  );
  const [filter, setFilter] = useState<'All' | 'Certification' | 'License'>(
    'All'
  );
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  // Reset visible count when filter changes to ensure consistent UX
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [filter]);

  // Filter Logic
  const filteredData =
    filter === 'All'
      ? certificationsData
      : certificationsData.filter((item) => item.category === filter);

  // Logic to load more items
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className='flex flex-col w-full min-h-screen bg-black text-neutral-200 py-14 sm:py-20 xl:py-12 items-center'>
      <div className='xl:max-w-5xl 2xl:max-w-6xl w-full px-4 md:px-8 mb-10'>
        {/* Breadcrumb */}
        <div className='mb-8'>
          <BreadcrumbWithCustomSeparator currentPage='Certifications & Licenses' />
        </div>

        {/* --- Controls Section (Filter) --- */}
        <div className='flex justify-start mb-10'>
          <div className='flex p-1 bg-[#1f1f1f] rounded-lg border border-[#353535] shrink-0'>
            {['All', 'License', 'Certification'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                  filter === tab
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* --- Grid Section --- */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7'>
          {filteredData.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className='cursor-pointer group flex flex-col bg-black border-[0.5px] border-[#353535] md:border-[#1f1f1f] hover:bg-[#141414] transition-all rounded-lg overflow-hidden hover:border-[#404040]'
              onClick={() => setSelectedItem(item)}
            >
              {/* Image Thumbnail */}
              <div className='relative w-full h-48 xl:h-40 2xl:h-48 overflow-hidden bg-neutral-900'>
                <Image
                  src={item.imgSrc}
                  alt={item.title}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100'
                />

                {/* Overlay Icon */}
                <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100'>
                  <div className='bg-black/50 backdrop-blur-sm p-3 rounded-full border border-white/10'>
                    <Maximize2 className='text-white h-5 w-5' />
                  </div>
                </div>

                {/* Badge Type */}
                <div className='absolute top-3 left-3'>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${
                      item.category === 'License'
                        ? 'bg-emerald-900/80 border-emerald-500/30 text-emerald-400'
                        : 'bg-blue-900/80 border-blue-500/30 text-blue-400'
                    }`}
                  >
                    {item.category === 'License' ? (
                      <ShieldCheck size={12} />
                    ) : (
                      <Award size={12} />
                    )}
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className='p-5 flex flex-col h-full'>
                <div className='mb-auto'>
                  <h3 className='text-lg font-medium text-neutral-100 mb-1 leading-snug group-hover:text-white'>
                    {item.title}
                  </h3>
                  <p className='text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3'>
                    Issued by {item.issuer} • {item.year}
                  </p>
                  <p className='text-sm text-neutral-400 line-clamp-2 leading-relaxed'>
                    {item.description}
                  </p>
                </div>

                {/* View Text */}
                <div className='mt-4 pt-4 border-t border-[#2a2a2a] flex items-center text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors'>
                  <span>View Details</span>
                  <ArrowUpRight size={12} className='ml-1' />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Show More Button --- */}
        {visibleCount < filteredData.length && (
          <div className='flex justify-center mt-12'>
            <Button
              variant='outline'
              onClick={handleShowMore}
              className='border-neutral-700 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white px-8'
            >
              Show More
              <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className='text-center py-20 text-neutral-500'>
            No items found for this category.
          </div>
        )}
      </div>

      {/* --- Modal --- */}
      {selectedItem && (
        <div
          className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200'
          onClick={() => setSelectedItem(null)}
        >
          <div
            className='relative max-w-4xl w-full bg-[#111] border border-[#333] rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Image */}
            <div className='w-full md:w-3/5 bg-black relative min-h-[300px] md:min-h-[500px]'>
              <Image
                src={selectedItem.imgSrc}
                alt={selectedItem.title}
                fill
                className='object-contain p-4'
              />
            </div>

            {/* Right: Details */}
            <div className='w-full md:w-2/5 p-8 flex flex-col bg-[#111] border-l border-[#222]'>
              <div className='mb-6'>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
                    selectedItem.category === 'License'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                      : 'bg-blue-950 text-blue-400 border border-blue-900'
                  }`}
                >
                  {selectedItem.category}
                </span>
                <h2 className='text-2xl font-bold text-white mb-2 leading-tight'>
                  {selectedItem.title}
                </h2>
                <p className='text-neutral-400 text-sm'>
                  Issued by{' '}
                  <span className='text-neutral-200'>
                    {selectedItem.issuer}
                  </span>
                </p>
                <p className='text-neutral-500 text-sm mt-1'>
                  Year of Issue: {selectedItem.year}
                </p>
              </div>

              <div className='prose prose-invert prose-sm text-neutral-300 mb-8'>
                <p>{selectedItem.description}</p>
              </div>

              <div className='mt-auto flex flex-col gap-3'>
                {selectedItem.pdfUrl && selectedItem.pdfUrl !== '#' && (
                  <Button
                    asChild
                    className='w-full bg-white text-black hover:bg-neutral-200 font-semibold'
                  >
                    <a
                      href={selectedItem.pdfUrl}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <ExternalLink className='mr-2 h-4 w-4' />
                      Verify Credential
                    </a>
                  </Button>
                )}
                <Button
                  variant='outline'
                  onClick={() => setSelectedItem(null)}
                  className='w-full border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
