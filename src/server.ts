import { config } from './config/index';
import connectDB from './config/database';
import app from './app';
import { seedRoles } from '@/seeds/role.seed';

const start = async (): Promise<void> => {
  await connectDB();

  await seedRoles();

  app.listen(config.port, () => {
    console.log(`Servidor iniciado en http://localhost:${config.port}`);
  });
};

start();
