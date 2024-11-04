import { lazy } from 'react';

export const lazyImport = <T extends Record<string, any>>(
  loader: () => Promise<T>,
  name: keyof T
) => lazy(async () =>
  {
    const module = await loader();
    return { default: module[name] };
  });