import { Component, lazy } from 'solid-js';

export const lazyImport = <T extends Record<string, Component<unknown>>>(
  loader: () => Promise<T>,
  name: keyof T
) => lazy(async () =>
  {
    const module = await loader();
    return { default: module[name] };
  });