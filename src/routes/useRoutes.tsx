import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Route as RouteType } from 'routes/types';

export default function useRoutes(routes: RouteType[]) {
  const transformRoutes = routes.reduce<JSX.Element[]>((prev, { path, component: Component }) => {
    const route = <Route key={path} path={path} element={<Component />} />;
    return [...prev, route];
  }, []);

  return (
    <Suspense fallback={<div />}>
      <Routes>
        {transformRoutes}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}
