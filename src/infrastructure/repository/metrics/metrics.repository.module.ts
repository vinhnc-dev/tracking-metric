import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricDistance } from '../../../infrastructure/entitiy/metric-distance.entity';
import { MetricTemperature } from '../../../infrastructure/entitiy/metric-temperature.entity';
import { MetricsRepository } from './metrics.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MetricTemperature, MetricDistance])],
  providers: [MetricsRepository],
  exports: [MetricsRepository],
})
export class MetricsRepositoryModule {}
