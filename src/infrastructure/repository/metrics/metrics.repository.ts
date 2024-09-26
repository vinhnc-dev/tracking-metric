import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetricTemperature } from '../../../infrastructure/entitiy/metric-temperature.entity';
import { MetricDistance } from '../../../infrastructure/entitiy/metric-distance.entity';
import { DataResponseDto, MetricCreateEntities } from './metrics.repository.i';
import { MetricGetSummaryArg } from '../../../application/usecase/metrics/metrics.usecase.i';

@Injectable()
export class MetricsRepository {
  constructor(
    @InjectRepository(MetricTemperature)
    private readonly temperatureRepository: Repository<MetricTemperature>,

    @InjectRepository(MetricDistance)
    private readonly distanceRepository: Repository<MetricDistance>
  ) {}

  public async createMetric(entities: MetricCreateEntities) {
    await this.distanceRepository.save(entities.distanceEntity);
    await this.temperatureRepository.save(entities.temperatureEntity);
  }

  public async getMetricList(params: any) {
    try {
      return params.type == 'distance' 
        ? await this.distanceRepository.find({
            where: { user: { id: params.userId }},
            relations: ['user']
          })
        : await this.temperatureRepository.find({
            where: { user: {id: params.userId}},
            relations: ['user']
        });
    } catch (e) {
      throw e;
    }
  }

  public async getMetricSummary(params: MetricGetSummaryArg) {
    try {
      const dis =  this.distanceRepository.createQueryBuilder('dis')
      .where('dis.user_id = :userId', { userId: params.userId })
      .andWhere('dis.date >= NOW() - CAST(:interval AS INTERVAL)', { interval: `${params.period} month` })
      .select(['dis.value AS value', 'dis.unit AS unit', 'dis.date AS date', 'MAX(created_at)'])
      .groupBy('dis.value')
      .addGroupBy('dis.unit')
      .addGroupBy('dis.date');
     
      const tem =  this.temperatureRepository.createQueryBuilder('tem')
      .where('tem.user_id = :userId', { userId: params.userId })
      .andWhere('tem.date >= NOW() - CAST(:interval AS INTERVAL)', { interval: `${params.period} month` })
      .select(['tem.value AS value', 'tem.unit AS unit', 'tem.date AS date', 'MAX(created_at)'])
      .groupBy('tem.value')
      .addGroupBy('tem.unit')
      .addGroupBy('tem.date');


      const [distances, temperatures] = await Promise.all([
        dis.getRawMany(),
        tem.getRawMany()
      ]);
  
      return {
        distances,
        temperatures
      } as DataResponseDto;
    } catch (error) {
        throw error;
    }
  }
}
