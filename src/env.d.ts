// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string;
  readonly VITE_WS_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}