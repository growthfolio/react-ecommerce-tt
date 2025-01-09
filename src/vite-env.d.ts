/// <reference types="vite/client" />

// Define os tipos das variáveis de ambiente usadas no projeto
interface ImportMetaEnv {
    readonly VITE_FIREBASE_API_KEY: string;
    readonly VITE_FIREBASE_AUTH_DOMAIN: string;
    readonly VITE_FIREBASE_PROJECT_ID: string;
    readonly VITE_FIREBASE_STORAGE_BUCKET: string;
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
    readonly VITE_FIREBASE_APP_ID: string;
    readonly VITE_BACKEND_URL: string;
    // Adicione outras variáveis aqui, se necessário
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  