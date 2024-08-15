/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_AW_PROJECT_ENDPOINT: string;
  readonly VITE_AW_PROJECT_ID: string;
  readonly VITE_AW_DATABASE_ID: string;
  readonly VITE_AW_PROFILE_PHOTO_STORAGE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
