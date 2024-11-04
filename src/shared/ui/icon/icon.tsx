import cn from 'classnames';
import type { SVGProps } from 'react';
import { SPRITES_META, type SpritesMap } from './sprite.gen';

export type IconName<Key extends keyof SpritesMap> = `${Key}/${SpritesMap[Key]}`;

export type AnyIconName = { [Key in keyof SpritesMap]: IconName<Key> }[keyof SpritesMap];

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: AnyIconName;
  ariaLabel?: string;
}

const getIconMeta = <Key extends keyof SpritesMap>(name: IconName<Key>) =>
{
  const [spriteName, iconName] = name.split('/') as [Key, SpritesMap[Key]];
  const { filePath, items } = SPRITES_META[spriteName];
  const { viewBox, width, height } = items[iconName];

  let axis: string;
  if(width === height)
  {
    axis = 'xy';
  }
  else if(width > height)
  {
    axis = 'x';
  }
  else
  {
    axis = 'y';
  }

  return {
    filePath,
    iconName,
    viewBox,
    axis
  };
};

export const Icon = ({
  name, className, ariaLabel, ...props
}: IconProps) =>
{
  const {
    viewBox, filePath, iconName, axis
  } = getIconMeta(name);

  return (
    <svg
      className={cn('icon', className)}
      viewBox={viewBox}
      data-axis={axis}
      focusable='false'
      aria-hidden={ariaLabel ? 'false' : 'true'}
      aria-label={ariaLabel}
      {...props}
    >
      <use href={`/sprites/${filePath}#${iconName}`} />
    </svg>
  );
};