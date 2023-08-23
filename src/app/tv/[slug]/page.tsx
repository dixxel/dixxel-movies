import Breadcrumbs from '@/components/Breadcrumbs';
import { tmdbFetch } from '@/lib/tmdb';
import { ImageResponse, TvResult } from '@/types/tmdb';
import Link from 'next/link';

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const show = await tmdbFetch<TvResult>(`/tv/${slug}?language=en-US`);

  return (
    <div
      className='relative z-10 flex-1 w-full flex items-center flex-col bg-cover bg-no-repeat bg-right after:absolute after:w-full after:h-full after:bg-gradient-to-r after:from-gray-900/90 after:to-gray-800'
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${show.backdrop_path})` }}
    >
      <div className='relative flex-1 z-10 p-5 max-w-[1000px] w-full'>
        <Breadcrumbs />
        <div className='flex justify-between w-full'>
          <div className='flex-2'>
            <h1 className='text-3xl font-bold'>{show.name}</h1>
            <p>{show.overview}</p>
          </div>
          <div>
            <Link href={`/`}></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
