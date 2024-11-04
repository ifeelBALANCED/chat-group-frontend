export interface SpritesMap {
  sprite: 'close' | 'logout' | 'new-chat-icon' | 'panel' | 'send-request-icon';
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
    filePath: 'sprite.03fe9be4.svg',
    items: {
      close: {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
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