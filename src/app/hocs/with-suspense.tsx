import { ComponentType, Suspense } from 'react';

const LoadingFallback = () => (
  <div className='flex min-h-screen items-center justify-center'>
    <div className='text-lg'>Loading...</div>
  </div>
);

export const withSuspense = (Component: ComponentType) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);