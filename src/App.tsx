import routes from 'routes';
import useRoutes from 'routes/useRoutes';
import type { Route } from 'routes/types';
import { useEffect } from 'react';
import { CustomWindow } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { selectRootSocket } from 'store/selectors';
import { initializeRootSocket } from 'store/ngAppReducer';

export default function App() {
  const dispatch = useDispatch();
  const rootSocket = useSelector(selectRootSocket);
  const appRoutes = useRoutes(Object.values(routes) as Route[]);

  useEffect(() => {
    (window as unknown as CustomWindow).ngSetServerLocation(
      process.env.REACT_APP_SERVER_LOCATION ?? ''
    );
    dispatch(initializeRootSocket((window as unknown as CustomWindow).ngRootSocket()));
  }, [dispatch]);

  useEffect(() => {
    /*
    rootSocket?.onConnected(() => console.log('Connected to root socket'));

    rootSocket?.on('ng_start', (d: any) => console.log('rootSocket onStart', d));

    rootSocket?.onError((error: any) => console.error(error));

    rootSocket?.on('ng_createView', (view: { id: string }) => {
      console.log('rootSocket onCreateView', view);
    });

    rootSocket?.onActivate((args: any) => {
      console.log('rootSocket onActivate', args);
    });

    rootSocket?.on('ng_progress', (d: any) => console.log('rootSocket onProgress', d));
    rootSocket?.on('ng_progressMsg', (d: any) => console.log('rootSocket onProgressMsg', d));

    rootSocket?.on('ng_hideView', (d: any) => console.log('rootSocket onHideView', d));

    rootSocket?.on('ng_destroyView', (d: any) => console.log('rootSocket onDestroyView', d));
    rootSocket?.onDisconnected(() => console.log('Disconnected from root socket'));
     */
  }, [rootSocket]);

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <main className="grow relative">
        <div className="absolute w-full h-full">{appRoutes}</div>
      </main>
    </div>
  );
}
