'use client';
import React from 'react';
import WhoWeAre from '@/components/aboutui/WhoWeAre';

import * as Sentry from '@sentry/nextjs';

const About = () => {
  Sentry.metrics.set('user_view_contact', 'client');

  return (
    <div className='relative flex justify-center bg-black items-center flex-col overflow-hidden mx-auto lg:py-24 py-10 sm:py-16'>
      <WhoWeAre />
    </div>
  );
};

export default About;
