import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const dbConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'sqlite',
    database: configService.get('database.name'),
    entities: configService.get('database.entities'),
    synchronize: configService.get('database.synchronize'),
});