import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicAigcModule } from './modules/basic-aigc/basic-aigc.module';
import { SceneAigcModule } from './modules/scene-aigc/scene-aigc.module';
import { getEnvConfig } from './utils/env';
import { OpenApiModule } from './modules/open-api/open-api.module';


export const getImportsConfig = () => {
  const ImportsConfig = [
    BasicAigcModule,
    SceneAigcModule,
    OpenApiModule,
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

  const postGresDBConnectUrl = getEnvConfig('POSTGRES_DB_CONNECT_URL');

  if (postGresDBConnectUrl) {
    ImportsConfig.push(
      TypeOrmModule.forRoot({
        url: postGresDBConnectUrl,
        type: 'postgres',
        autoLoadEntities: true,
      }),
    );
  }

  return ImportsConfig;
};
