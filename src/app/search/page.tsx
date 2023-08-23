import Card from '@/components/Card';
import SearchBar from '@/components/SearchBar';
import { tmdbFetch } from '@/lib/tmdb';
import { BaseResponse } from '@/types/tmdb';

const Page = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const { query } = searchParams;
  const response = await tmdbFetch<BaseResponse>(
    `/search/multi?query=${query}&language=en-US&page=1&include_adult=true`
  );
  const results = response.results.sort((a, b) => b.vote_average - a.vote_average);

  return (
    <div className='relative flex-1 z-10 p-5 flex items-center flex-col gap-5 px-0 max-w-[1000px] w-full'>
      <h1 className='self-start text-3xl py-3'>
        Search result for <span className='font-bold'>{query}</span>
      </h1>
      <div className='flex flex-wrap justify-between w-full gap-10'>
        {response && results.map((result) => <Card key={result.id} data={result} />)}
      </div>
    </div>
  );
};

export default Page;
