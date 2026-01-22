import React from 'react';
import { organization } from '@/data/index';

const OurTeam = () => {
  return (
    <div className='px-4 md:px-8'>
      <div className='grid-cols-1 sm:grid-cols-2 grid gap-7'>
        {organization.map((team, index) => {
          return (
            <div
              className='cursor-pointer  snap-y bg-black border-[0.5px]	border-[#353535] md:border-[#1f1f1f] hover:border-collapse hover:bg-[#141414] transition-all active:bg-[#1F1F1F] active:border-collapse hover:shadow-sm  ease-in-out rounded-lg  p-3'
              key={index}
            >
              <div className='mt-3 items-baseline gap-1 flex flex-col text-wrap break-words'>
                <h2 className='font-bold text-xl  px-2 mb-2 mt-1'>
                  {team.name}
                </h2>

                <h2 className='text-base text-white-100 bg-neutral-800/80 py-1 rounded-xl px-2'>
                  {team.position}
                </h2>

                <p className='text-base px-2 	mb-2 mt-2 text-slate-300'>
                  {team.experience} of Experience
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurTeam;
