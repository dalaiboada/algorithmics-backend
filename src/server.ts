import { config } from './config/index';
import connectDB from './config/database';
import app from './app';

const start = async (): Promise<void> => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Servidor iniciado en http://localhost:${config.port}`);
  });
};

start();
