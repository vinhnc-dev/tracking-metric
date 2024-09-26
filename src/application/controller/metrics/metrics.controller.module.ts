import { MetricsUsecaseModule } from './../../usecase/metrics';
import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';

@Module({
  imports: [MetricsUsecaseModule],
  controllers: [MetricsController],
})
export class MetricsControllerModule {}
