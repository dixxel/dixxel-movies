'use client';

import { Transition } from '@headlessui/react';
import { IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { FormEvent, Fragment, useState } from 'react';

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (query.length > 0) {
      router.push(`/search?query=${query}`);
    }
  };

  return (
    <form className='flex items-center gap-1 py-1 px-3 rounded-xl bg-gray-600 h-fit'>
      <IconSearch width={24} height={24} />
      <input
        type='text'
        onChange={(e) => setQuery(e.currentTarget.value)}
        className='bg-transparent rounded-md mx-1 p-1 border-0'
      />
      <button
        type='submit'
        onSubmit={handleClick}
        className='uppercase text-sm hover:underline hover:text-blue-500'
        onClick={handleClick}
      >
        search
      </button>
    </form>
  );
};

export default SearchBar;
