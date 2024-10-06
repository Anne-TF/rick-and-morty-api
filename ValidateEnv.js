const { bool, cleanEnv, host, port, str, url, num } = require('envalid');

const validateEnv =  (config) =>
{
  const clean = cleanEnv(config, {
    NODE_ENV: str({
      choices: ['development', 'test', 'production', 'staging']
    }),

    PROJECT_NAME: str({ default: 'base_dash' }),
    PORT: port({ default: 3000 }),

    API_HOST: host({ default:'app.localhost' }),
    API_PORT: port({ default: undefined }),
    API_BASE_PATH: str({ default: 'api/v1' }),
    API_USE_SSL: bool({ default: false }),
    API_WITH_CREDENTIALS: bool({ default: false }),

    USE_LOCAL_STORAGE: bool({ default: false }),
  });

  config = { ...config, ...clean };

  process.env = { ...process.env, ...config };

  return config;
};

module.exports = validateEnv;
