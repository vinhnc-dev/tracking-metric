import { Module } from '@nestjs/common';
import {
  MetricsRepository,
  MetricsRepositoryModule,
} from '../../../infrastructure/repository/metrics';
import { MetricsUsecase } from '.';

@Module({
  imports: [MetricsRepositoryModule],
  providers: [MetricsUsecase],
  exports: [MetricsUsecase],
})
export class MetricsUsecaseModule {}
