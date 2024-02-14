import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { BasicAigcModule } from './modules/basic-aigc/basic-aigc.module';
import { SceneAigcModule } from './modules/scene-aigc/scene-aigc.module';
import { getEnvConfig } from './utils/env';

export const getImportsConfig = () => {
  const ImportsConfig = [
    BasicAigcModule,
    SceneAigcModule,
    // load config
    ConfigModule.forRoot(),
  ];

  if (getEnvConfig('USERNAME')) {
    ImportsConfig.push(
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: getEnvConfig('HOST'),
        port: getEnvConfig('PORT'),
        username: getEnvConfig('USERNAME'),
        password: getEnvConfig('PASSWORD'),
        database: getEnvConfig('DATABASE'),
      }),
    );
  }

  const mongoDBConnectUrl = getEnvConfig('MONGO_DB_CONNECT_URL');

  if (mongoDBConnectUrl) {
    ImportsConfig.push(MongooseModule.forRoot(mongoDBConnectUrl));
  }

  return ImportsConfig;
};
