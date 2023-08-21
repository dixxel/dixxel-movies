import StateProvider from '@/components/StateProvider';
import './globals.css';
import { Poppins } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
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
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${poppins.className} bg-gradient-to-bl from-gray-900 to-gray-800 text-white min-h-screen m-0 flex flex-col`}
        >
          <main className='flex-1 w-full lg:flex lg:items-center lg:flex-col'>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
