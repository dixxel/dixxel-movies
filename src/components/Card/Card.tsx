'use client';

import { BaseResults } from '@/types/tmdb';
import { IconPhotoOff } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  data: BaseResults;
}

const Card: React.FC<Props> = ({ data }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className='w-[300px]'>
      {!imageError ? (
        <Link className='flex relative w-[300px] h-[500px]' href={`/${data.media_type}/${data.id}`}>
          <Image
            src={`https://image.tmdb.org/t/p/original/${data.poster_path ? data.poster_path : data.profile_path}`}
            alt={data.title ? data.title : data.name!}
            className='rounded-md'
            fill
            onError={() => setImageError(true)}
          />
        </Link>
      ) : (
        <Link
          className='w-[300px] h-[500px] rounded-md flex flex-col gap-2 items-center justify-center bg-gray-700'
          href={`/${data.media_type}/${data.id}`}
        >
          <IconPhotoOff />
          <p>No image found</p>
        </Link>
      )}

      <div className=''>
        <div className='flex justify-between text-sm'>
          <p>{data.release_date ? data.release_date : data.first_air_date}</p>
          <p>
            {data.vote_average} <span className='text-gray-400'>({data.vote_count})</span>
          </p>
        </div>
        <h2 className='text-lg break-words font-bold'>{data.title ? data.title : data.name}</h2>
      </div>
    </div>
  );
};

export default Card;
