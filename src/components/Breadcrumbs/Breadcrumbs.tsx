'use client';

import { IconChevronRight, IconHome } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const getCumulativePathSegments = (path: string) =>
  path
    .split('/')
    .filter(Boolean)
    .reduce<string[]>((segments, segment) => {
      const previous = segments[segments.length - 1] || '/';
      segments.push(`${previous}${segment}/`);
      return segments;
    }, []);

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathLinks = getCumulativePathSegments(pathname);
  const pathNames = pathname.split('/');

  return (
    <div className='flex gap-2 items-center pt-2 pb-3'>
      <Link href='/'>
        <IconHome />
      </Link>
      <IconChevronRight size={20} />
      {pathLinks &&
        pathLinks.map((path, index) => (
          <>
            <Link href={path} key={path} className='uppercase'>
              {pathNames[index + 1]}
            </Link>
            {index + 1 < pathLinks.length ? <IconChevronRight size={20} /> : null}
          </>
        ))}
    </div>
  );
};

export default Breadcrumbs;
