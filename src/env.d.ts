interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_MOVIT_BK: string
  readonly VITE_GITHUB_CLIENT_ID: string
  readonly VITE_GITHUB_CLIENT_SECRET:string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}