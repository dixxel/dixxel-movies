import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/search(.*)', '/all(.*)', '/movie(.*)', '/tv(.*)', '/person(.*)', '/api(.*)'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
