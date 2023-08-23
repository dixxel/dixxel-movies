import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SearchBar from '../SearchBar';

const Navbar = () => {
  return (
    <div className='w-full mx-auto z-20 bg-gray-700 shadow-md flex justify-center items-center'>
      <div className='w-full max-w-[1000px] flex flex-col'>
        <div className='w-full flex justify-between items-center py-2 border-b border-gray-500'>
          <div className='flex gap-5 items-center'>
            <Link href='/'>
              <Image
                src='https://imagedelivery.net/3ecvmLCFkS-FijMWb0qFvQ/1051182d-c69e-4b50-bd3a-34d24ab8f800/public'
                width={100}
                height={50}
                alt=''
              />
            </Link>
          </div>
          <SearchBar />
        </div>
        <div className='flex gap-2 h-full'>
          <Link
            href='/movie'
            className='uppercase text-lg h-full w-20 py-2 text-center transition-all hover:bg-blue-500'
          >
            Movies
          </Link>
          <Link href='/tv' className='uppercase text-lg h-full w-20 py-2 text-center transition-all hover:bg-blue-500'>
            TV
          </Link>
          <Link
            href='/people'
            className='uppercase text-lg h-full w-20 py-2 text-center transition-all hover:bg-blue-500'
          >
            People
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
