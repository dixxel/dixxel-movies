import StateProvider from '@/components/StateProvider';
import './globals.css';
import { Poppins } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { tmdbFetch } from '@/lib/tmdb';
import Link from 'next/link';
import { BaseResponse, BaseResults } from '@/types/tmdb';
import Navbar from '@/components/Navbar';
import Cookie from '@/components/Cookie';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export const metadata = {
  title: 'Movies',
  description: 'Movies',
  openGraph: {
    title: 'Movies',
    description: 'Movies',
    url: 'https://movies.dixxel.io',
    siteName: 'Movies',
    images: [
      {
        url: 'https://dixxel.io/_next/static/media/banner_1024x512.562a7bab.png',
        width: 1024,
        height: 512,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const trending = await tmdbFetch<BaseResponse>('/trending/all/day?language=en-US');

  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${poppins.className}  text-white min-h-screen m-0 flex flex-col`}>
          <main
            className='relative flex-1 w-full flex items-center flex-col bg-cover bg-no-repeat bg-left after:absolute after:w-full after:h-full after:bg-gradient-to-r after:from-gray-900/90 after:to-gray-800'
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${trending.results[0].poster_path})` }}
          >
            <Navbar />
            {children}
          </main>
          <Cookie />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
