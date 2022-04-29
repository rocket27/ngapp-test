import routes from 'routes';
import useRoutes from 'routes/useRoutes';
import type { Route } from 'routes/types';
import { useEffect } from 'react';
import { CustomWindow } from 'types';
import rootSocket from 'rootSocket';

export default function App() {
  const appRoutes = useRoutes(Object.values(routes) as Route[]);

  useEffect(() => {
    (window as unknown as CustomWindow).ngSetServerLocation(
      process.env.REACT_APP_SERVER_LOCATION ?? ''
    );

    // Пока это строка когда не закомментирована подключение теряется, так как в компоненте Main уже есть вызов рутового сокета
    rootSocket.on('ng_progress', () => console.log('onProgress'));
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <main className="grow relative">
        <div className="absolute w-full h-full">{appRoutes}</div>
      </main>
    </div>
  );
}
