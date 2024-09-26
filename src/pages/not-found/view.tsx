import { A } from '@solidjs/router';

export const NotFoundPage = () => (
  <div class='min-h-screen flex items-center justify-center bg-base-200'>
    <div class='text-center'>
      <h1 class='text-6xl font-bold text-primary mb-4'>404</h1>
      <p class='text-2xl mb-4'>Oops! Page not found.</p>
      <p class='mb-8'>The page you're looking for doesn't exist or has been moved.</p>

      <A href='/' class='btn btn-primary'>
        Go Back Home
      </A>
    </div>
  </div>
);