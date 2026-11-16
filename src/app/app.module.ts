import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturerModule } from 'src/manufacturer/manufacturer.module';
import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT ?? 5432),
      username: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASS,

      autoLoadEntities: true,
      synchronize: true,

      ssl: (() => {
        const caPath = path.resolve(
          process.cwd(),
          process.env.DB_SSL_CA_PATH ??
            './certs/global-bundle.pem',
        );

        if (!fs.existsSync(caPath)) {
          throw new Error(
            `Certificado SSL não encontrado: ${caPath}`,
          );
        }

        return {
          ca: fs.readFileSync(caPath, 'utf8'),
          rejectUnauthorized:
            process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
        };
      })(),
    }),

    ManufacturerModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
