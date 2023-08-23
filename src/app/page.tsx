import SearchBar from '@/components/SearchBar';
import { tmdbFetch } from '@/lib/tmdb';
import { BaseResponse } from '@/types/tmdb';
import Link from 'next/link';

const Page = async () => {
  const allTrending = await tmdbFetch<BaseResponse>('/trending/all/day?language=en-US');
  const movieTrending = await tmdbFetch<BaseResponse>('/trending/movie/day?language=en-US');
  const tvTrending = await tmdbFetch<BaseResponse>('/trending/tv/day?language=en-US');

  return (
    <div className='relative flex-1 z-10 p-5 flex justify-center items-center flex-col gap-5 px-0 max-w-[1000px] w-full'>
      <Link
        href='/all'
        className='relative flex-1 w-full flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-md shadow-lg cursor-pointer group after:absolute after:w-full after:h-full after:bg-gradient-to-r after:from-blue-500/10 after:to-blue-900/70 after:rounded-md'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${
            allTrending.results[Math.floor(Math.random() * allTrending.results.length)].poster_path
          })`,
        }}
      >
        <p className='relative z-20 uppercase text-3xl font-bold group-hover:underline'>Trending & Toplists</p>
      </Link>
      <div className='flex-1 flex gap-5 w-full'>
        <Link
          href='/movies'
          className='relative w-full flex-1 flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-md shadow-lg cursor-pointer group after:absolute after:w-full after:h-full after:bg-gradient-to-r after:from-blue-500/10 after:to-blue-900/70 after:rounded-md'
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${
              movieTrending.results[Math.floor(Math.random() * movieTrending.results.length)].poster_path
            })`,
          }}
        >
          <p className='relative z-20 uppercase text-3xl font-bold group-hover:underline'>Movies</p>
        </Link>
        <Link
          href='/tv'
          className='relative w-full flex-1 flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-md shadow-lg cursor-pointer group after:absolute after:w-full after:h-full after:bg-gradient-to-r after:from-blue-500/10 after:to-blue-900/70 after:rounded-md'
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${
              tvTrending.results[Math.floor(Math.random() * tvTrending.results.length)].poster_path
            })`,
          }}
        >
          <p className='relative z-30 uppercase text-3xl font-bold group-hover:underline'>TV</p>
        </Link>
      </div>
    </div>
  );
};

export default Page;
