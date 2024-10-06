const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const validateEnv = require('./ValidateEnv');
require('dotenv').config();

(async() =>
{
  let server;

  validateEnv(process.env);

  try
  {
    const app = express();
    // Permitir que la aplicación SPA se enrutada correctamente en cualquier ruta
    app.use(history());

    // Establecer la carpeta de archivos estáticos
    app.use(serveStatic(`${__dirname  }/dist/spa`, {
      maxAge: '1d',
      setHeaders(res, path)
      {
        res.setHeader('Cache-Control', 'public, max-age=864000');
      }
    }));

    // Iniciar el servidor en el puerto especificado en la variable de entorno PORT
    const port = process.env.PORT || process.env.APP_PORT || 3011;

    server = await app.listen(port, '0.0.0.0');

    // eslint-disable-next-line no-console
    console.log(`Servidor iniciado en el puerto ${port}`);
  }
  catch (error)
  {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  async function closeGracefully(signal)
  {
    await server.close();
    process.kill(process.pid, signal);
  }

  process.once('SIGINT', closeGracefully);
  process.once('SIGTERM', closeGracefully);
  process.once('SIGUSR2', closeGracefully);

})();
