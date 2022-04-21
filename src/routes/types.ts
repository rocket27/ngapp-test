export interface Route {
  path: string;
  title: string;
  component: React.LazyExoticComponent<() => JSX.Element | null>;
}
