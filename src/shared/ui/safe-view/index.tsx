import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import { ReactNode } from 'react';

type RenderChildrenProps<E> = {
  for: E;
  withProps: true;
  otherwise?: ReactNode | null;
  children: (data: NonNullable<E>) => ReactNode;
};

type PrimaryChildren<E> = {
  for: E;
  withProps?: false;
  otherwise?: ReactNode | null;
  children: ReactNode;
};

type Props<E> = RenderChildrenProps<E> | PrimaryChildren<E>;

export const SafeView = <E, >({
  for: data,
  children,
  otherwise = '--',
  withProps = false
}: Props<E>) =>
{
  if(!data)
  {
    return <>{otherwise}</>;
  }
  if(isNil(data))
  {
    return <>{otherwise}</>;
  }

  if((isArray(data) || isString(data)) && data.length === 0)
  {
    return <>{otherwise}</>;
  }

  if(isBoolean(data))
  {
    return <>{data ? children : otherwise}</>;
  }

  if(withProps && isFunction(children))
  {
    return <>{children(data)}</>;
  }

  return <>{children}</>;
};