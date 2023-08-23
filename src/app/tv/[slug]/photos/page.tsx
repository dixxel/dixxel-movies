import Breadcrumbs from '@/components/Breadcrumbs';
import { tmdbFetch } from '@/lib/tmdb';
import { ImageResponse, TvResult } from '@/types/tmdb';
import { IconHome } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const show = await tmdbFetch<TvResult>(`/tv/${slug}?language=en-US`);
  const images = await tmdbFetch<ImageResponse>(`/tv/${slug}/images`);
  const sortedImages = images.backdrops.sort((a, b) => b.vote_average - a.vote_average);

  return (
    <div
      className='relative z-10 flex-1 w-full flex items-center flex-col bg-cover bg-no-repeat bg-right after:absolute after:w-full after:h-full after:bg-gradient-to-r after:from-gray-900/90 after:to-gray-800'
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${show.backdrop_path})` }}
    >
      <div className='relative flex-1 z-10 p-5 max-w-[1000px] w-full'>
        <Breadcrumbs />
        <div className='grid grid-cols-3 gap-2'>
          {sortedImages &&
            sortedImages.map((image) => (
              <Link
                key={image.file_path}
                className='relative w-full h-48'
                href={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                target='_blank'
              >
                <Image src={`https://image.tmdb.org/t/p/original/${image.file_path}`} fill alt='' />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
