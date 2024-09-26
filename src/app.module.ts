import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { MetricsControllerModule } from './application/controller/metrics/metrics.controller.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const options = await getConnectionOptions();
        return {
          ...options,
        } as TypeOrmModuleOptions;
      },
    }),
    MetricsControllerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
