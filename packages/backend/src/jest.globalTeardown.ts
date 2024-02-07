import { MongoMemoryServer } from 'mongodb-memory-server';

module.exports = async function globalTeardown() {
  const instance: MongoMemoryServer = (global as any).__MONGODB_INSTANCE;
  if (instance) await instance.stop();
};
