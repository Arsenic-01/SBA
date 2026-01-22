'use client';

import React from 'react';
import Image from 'next/image';
import { Bitter } from 'next/font/google';
import WaterDropGrid from '../ui/WaterDropGrid';
import OurTeam from './OurTeam';

// UI Components
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

// Icons
import { Quote, CheckCircle2, Target, ShieldCheck } from 'lucide-react';

const bitter = Bitter({ subsets: ['latin'] });

const WhoWeAre = () => {
  return (
    <section className='relative py-20 w-full overflow-hidden'>
      {/* Background */}
      <div className='absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none'>
        <WaterDropGrid />
      </div>

      <div className='relative mx-auto max-w-6xl px-6 lg:px-8 z-10'>
        {/* --- Header --- */}
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

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>
          {/* --- LEFT: Company Narrative (Span 7) --- */}
          <div className='lg:col-span-7 space-y-8'>
            {/* Introduction Text */}
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

            {/* Key Pillars (Manual Cards) */}
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

            {/* CTA */}
            <div className='pt-2'>
              <DialogDemo />
            </div>
          </div>

          {/* --- RIGHT: Founder Profile (Span 5) --- */}
          <div className='lg:col-span-5'>
            <div className='relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden p-6 hover:border-red-500/30 transition-colors duration-300'>
              {/* Header: Image & Name */}
              <div className='flex items-start gap-5 mb-6'>
                <div className='relative h-20 w-20 shrink-0 rounded-full overflow-hidden border-2 border-neutral-700'>
                  {/* PLACEHOLDER: Replace with actual image path */}
                  <Image
                    src='/person1.png'
                    alt='Mr. Sunil D. Bhor'
                    width={80}
                    height={80}
                    className='object-cover'
                  />
                </div>
                <div>
                  {/* Custom Badge Replacement */}
                  <span className='inline-block px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[10px] font-semibold border border-red-500/20 mb-2 uppercase tracking-wide'>
                    Founder
                  </span>
                  <h3
                    className={`${bitter.className} text-xl text-white font-bold`}
                  >
                    Mr. Sunil D. Bhor
                  </h3>
                  <p className='text-neutral-400 text-xs mt-1 leading-snug'>
                    M.Tech (Civil), FIV, FM, ACCE, PM.PVAI
                  </p>
                </div>
              </div>

              {/* Custom Separator */}
              <div className='h-px w-full bg-neutral-800 mb-6' />

              {/* Roles List */}
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

              {/* Quote Footer */}
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
      </div>
    </section>
  );
};

export default WhoWeAre;

// --- Dialog Component ---

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='rounded-full border-neutral-700 bg-transparent text-neutral-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all px-6'
        >
          View Full Team
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-7xl w-full h-[80vh] p-0 bg-neutral-950 border-neutral-800 overflow-y-auto flex flex-col text-neutral-200'>
        <DialogHeader className='p-6 pb-4 bg-neutral-950 z-10 border-b border-neutral-800'>
          <DialogTitle className='text-2xl font-semibold text-white'>
            Our Experts
          </DialogTitle>
          <DialogDescription className='text-neutral-400'>
            The dedicated professionals behind our success.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Area */}
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
