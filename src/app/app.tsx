import { useEffect, useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { AppRoutes } from './appRouter';
import { socketConnection } from '@/shared/lib/create-socket-connection';
import { browserHistory, updateHistory } from '@/shared/router';

export const Application = () =>
{
  const { initializeSocket, disconnectSocket } = useUnit(socketConnection);
  const { update } = useUnit({
    update: updateHistory
  });

  const [state, setState] = useState({
    action: browserHistory.action,
    location: browserHistory.location
  });

  useLayoutEffect(() =>
  {
    browserHistory.listen((hist) =>
    {
      setState(hist);
      update(hist);
    });
  }, [update]);

  useEffect(() =>
  {
    initializeSocket().catch((error) =>
    {
      console.error('Failed to initialize WebSocket:', error);
    });

    return () =>
    {
      disconnectSocket().catch((error) =>
      {
        console.error('Failed to disconnect WebSocket:', error);
      });
    };
  }, []);

  return (
    <Router location={state.location} navigationType={state.action} navigator={browserHistory}>
      <AppRoutes />
    </Router>
  );
};