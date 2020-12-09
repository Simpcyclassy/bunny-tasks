import { ConnectionOptions } from "mongoose";

export interface MongoConfig {
  MONGODB_URL: string;
  MONGODB_USERNAME: string;
  MONGODB_PASSWORD: string;
}

export const defaultMongoOpts = (): ConnectionOptions => {
  return { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true };
};

export const secureMongoOpts = (config: MongoConfig): ConnectionOptions => {
  return {
    ...defaultMongoOpts,
    user: config.MONGODB_USERNAME,
    pass: config.MONGODB_PASSWORD
  };
};

export function createConfig(appEnv: boolean, config: MongoConfig) {
  return appEnv ? secureMongoOpts(config) : defaultMongoOpts;
}
