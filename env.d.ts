declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;

    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;

    PROJECT_NAME: string;
    PORT: number;

    API_HOST: string;
    API_PORT: number;
    API_BASE_PATH: string;
    API_USE_SSL: boolean;
    API_WITH_CREDENTIALS: boolean;

    USE_LOCAL_STORAGE: boolean;
  }
}
