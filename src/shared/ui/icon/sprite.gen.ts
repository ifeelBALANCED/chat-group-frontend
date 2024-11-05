export interface SpritesMap {
  sprite: 'close' | 'home' | 'logout' | 'new-chat-icon' | 'panel' | 'send-request-icon';
}
export const SPRITES_META: {
  [Key in keyof SpritesMap]: {
    filePath: string;
    items: Record<
      SpritesMap[Key],
      {
        viewBox: string;
        width: number;
        height: number;
      }
    >;
  };
} = {
  sprite: {
    filePath: 'sprite.5d1b522b.svg',
    items: {
      close: {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      },
      home: {
        viewBox: '0 0 24 24',
        width: 100,
        height: 100
      },
      logout: {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      },
      'new-chat-icon': {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      },
      panel: {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      },
      'send-request-icon': {
        viewBox: '0 0 32 32',
        width: 32,
        height: 32
      }
    }
  }
};