import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configs/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './configs/database.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => databaseConfig(configService),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
