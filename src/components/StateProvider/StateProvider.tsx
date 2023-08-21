'use client';

import { Provider } from 'jotai';

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default StateProvider;
