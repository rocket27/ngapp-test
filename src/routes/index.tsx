import { lazy } from 'react';

export default {
  main: {
    title: 'Главная',
    path: '/',
    component: lazy(() => import('pages/main')),
  },
  menu: {
    title: 'Меню',
    path: '/menu',
    component: lazy(() => import('pages/menu')),
  },
};
