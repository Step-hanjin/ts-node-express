import app from './app';
import config from './config/config';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Data Source has been initialized!');
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error during Data Source initialization:', error);
    process.exit(1);
  });