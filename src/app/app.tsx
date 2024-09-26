import { ErrorBoundary, Suspense } from 'solid-js';
import { Route, Router } from '@solidjs/router';
import { lazyImport } from '~/shared/lib/lazy';
import { BaseLayout } from '~/app/layouts';

const LoginPage = lazyImport(() => import('~/pages/login'), 'LoginPage');
const RegisterPage = lazyImport(() => import('~/pages/register'), 'RegisterPage');
const ChatGroupPage = lazyImport(() => import('~/pages/chat-group'), 'ChatGroupPage');
const ChatGroupsPage = lazyImport(() => import('~/pages/chat-groups'), 'ChatGroupsPage');
const NotFoundPage = lazyImport(() => import('~/pages/not-found'), 'NotFoundPage');

const Fallback = () => (
  <div class='flex items-center justify-center h-screen'>
    <div class='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
  </div>
);

const ErrorBoundaryFallback = (error: Error) => (
  <div class='flex items-center justify-center h-screen'>
    <div class='bg-red-500 text-white p-8 rounded-lg'>
      <h2 class='text-2xl font-bold'>Oops, something went wrong!</h2>
      <p class='mt-4'>{error.message}</p>
    </div>
  </div>
);

export const Application = () => (
  <Router>
    <ErrorBoundary fallback={ErrorBoundaryFallback}>
      <Suspense fallback={<Fallback />}>
        <Route path='/' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/chat-groups' component={BaseLayout}>
          <Route path='/' component={ChatGroupsPage} />
          <Route path='/:id' component={ChatGroupPage} />
        </Route>
        <Route path='/*all' component={NotFoundPage} />
      </Suspense>
    </ErrorBoundary>
  </Router>
);