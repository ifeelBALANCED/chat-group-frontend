import {
  Navigate, Outlet, Route, Routes
} from 'react-router-dom';
import { BaseLayout } from './layouts';
import { lazyImport } from '@/shared/lib/lazy';
import { withSuspense } from './hocs';
import { ReactElement } from 'react';
import { useUnit } from 'effector-react';
import { sessionModel } from '@/entities/session';

const LoginPage = lazyImport(() => import('@/pages/login'), 'LoginPage');
const RegisterPage = lazyImport(() => import('@/pages/register'), 'RegisterPage');
const ChatGroupPage = lazyImport(() => import('@/pages/chat-group'), 'ChatGroupPage');
const ChatGroupsPage = lazyImport(() => import('@/pages/chat-groups'), 'ChatGroupsPage');

type GuardProps = {
  children: ReactElement;
};

const PublicGuard = ({ children }: GuardProps) =>
{
  const isAuthorized = useUnit(sessionModel.$isAuthenticated);

  if(isAuthorized)
  {
    return <Navigate to='/chat-groups' replace />;
  }

  return children;
};

const PrivateGuard = ({ children }: GuardProps) =>
{
  const isAuthorized = useUnit(sessionModel.$isAuthenticated);

  if(!isAuthorized)
  {
    return <Navigate to='/' replace />;
  }

  return children;
};

export const AppRoutes = () =>
{
  const isAuthorized = useUnit(sessionModel.$isAuthenticated);

  return (
    <Routes>
      <Route
        element={
          <PublicGuard>
            <Outlet />
          </PublicGuard>
        }
      >
        <Route index element={withSuspense(LoginPage)} />
        <Route path='register' element={withSuspense(RegisterPage)} />
      </Route>

      <Route
        element={
          <PrivateGuard>
            <BaseLayout />
          </PrivateGuard>
        }
      >
        <Route path='chat-groups'>
          <Route index element={withSuspense(ChatGroupsPage)} />
          <Route path=':id' element={withSuspense(ChatGroupPage)} />
        </Route>
      </Route>

      <Route path='*' element={<Navigate to={isAuthorized ? '/chat-groups' : '/'} replace />} />
    </Routes>
  );
};