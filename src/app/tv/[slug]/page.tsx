import Breadcrumbs from '@/components/Breadcrumbs';
import { tmdbFetch } from '@/lib/tmdb';
import { CreditsResponse, ImageResponse, TvResult } from '@/types/tmdb';
import Image from 'next/image';
import Link from 'next/link';

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const show = await tmdbFetch<TvResult>(`/tv/${slug}?language=en-US`);
  const credits = await tmdbFetch<CreditsResponse>(`/tv/${slug}/aggregate_credits`);

  return (
    <div
      className='relative z-10 flex-1 w-full flex items-center flex-col bg-cover bg-no-repeat bg-right after:absolute after:w-full after:h-full after:bg-gradient-to-r after:from-gray-900/90 after:to-gray-800'
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${show.backdrop_path})` }}
    >
      <div className='relative flex-1 z-10 p-5 max-w-[1000px] w-full'>
        <Breadcrumbs />
        <div className='flex justify-between w-full'>
          <div className='flex-1'>
            <h1 className='text-3xl font-bold'>{show.name}</h1>
            <p>{show.overview}</p>
          </div>
          <div className='w-1/4 flex flex-col gap-5 items-end bg-gray-700 p-2 rounded-md'>
            <div className='text-right'>
              <p className='uppercase font-bold'>
                Episodes: <span className='font-normal text-gray-300'>{show.number_of_episodes}</span>
              </p>
              <p className='uppercase font-bold'>
                Seasons: <span className='font-normal text-gray-300'>{show.number_of_seasons}</span>
              </p>
            </div>
            <div className='text-right'>
              <p className='uppercase font-bold'>Rating</p>
              <p>
                {show.vote_average} ({show.vote_count})
              </p>
            </div>
            <div className='text-right'>
              <p className='uppercase font-bold'>Networks</p>
              {show.networks.map((network) => (
                <Link className='font-normal text-gray-300' href={`/network/${network.id}`} key={network.id}>
                  {network.name}
                </Link>
              ))}
            </div>
            <Link href={`/tv/${slug}/photos`} className='uppercase underline'>
              + Show photos
            </Link>
          </div>
        </div>
        <div className='w-full mt-5 flex flex-col'>
          <h2 className='text-xl'>Seasons</h2>
          <div className='flex gap-2 flex-wrap'>
            {show.seasons.map((season) => (
              <Link key={season.id} className='relative w-36 h-52' href={`/tv/${slug}/season/${season.season_number}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/original/${season.poster_path}`}
                  fill
                  alt=''
                  className='rounded-md'
                />
                <p className='absolute top-0 p-1 text-center w-full font-bold uppercase rounded-t-md bg-gray-500/50'>
                  {season.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className='w-full mt-5 flex gap-2 flex-wrap'>
          <h2 className='text-xl'>Cast</h2>
          <div className='flex gap-2 flex-wrap'>
            {credits.cast.map((member) => (
              <Link key={member.id} className='relative w-36 h-52 flex flex-col gap-1' href={`/person/${member.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/original/${member.profile_path}`}
                  fill
                  alt=''
                  className='rounded-md'
                />
                <div className='absolute top-0 p-1 text-center w-full rounded-t-md bg-gray-500/50'>
                  <p className='font-bold'>{member.roles[0].character}</p>
                  <p className=''>{member.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
