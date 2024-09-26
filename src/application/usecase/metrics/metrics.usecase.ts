import { User } from '../../../infrastructure/entitiy/user.entity';
import { DistanceFactory } from './../../../infrastructure/factory/metric-distance.factory';
import { MetricsRepository } from './../../../infrastructure/repository/metrics/metrics.repository';
import { Injectable } from '@nestjs/common';
import { TemperatureFactory } from '../../../infrastructure/factory/metric-temperature.factor';
import { MetricCreateArg, MetricGetListArg, MetricGetSummaryArg } from './metrics.usecase.i';
import { convertDistance, convertTemperature } from '../../../common/utils/utils';
import { DataResponseDto } from '../../../infrastructure/repository/metrics/metrics.repository.i';

@Injectable()
export class MetricsUsecase {
  constructor(private readonly repository: MetricsRepository) {}

  public async createMetric(args: MetricCreateArg) {
    const user = new User();
    user.id = args.userId;

    const distanceEntity = new DistanceFactory({
      user,
      date: args.date,
      unit: args.distance.unit,
      value: args.distance.value,
    });

    const temperatureEntity = new TemperatureFactory({
      user,
      date: args.date,
      unit: args.temperature.unit,
      value: args.temperature.value,
    });

    try {
      await this.repository.createMetric({
        distanceEntity,
        temperatureEntity,
      });      
    } catch (error) {
      throw error;
    }
  }

  public async getMetricList(args: MetricGetListArg) {
    try {
      return await this.repository.getMetricList(args);
    } catch (error) {
      throw error;
    }
  }

  public async getMetricSummary(args: MetricGetSummaryArg) {
    try {
      const data = await this.repository.getMetricSummary(args);

      return this.convertData(args, data) 
    } catch (error) {
      throw error;
    }
  }

  private convertData(args: MetricGetSummaryArg, data: DataResponseDto) {
    const distance = data.distances.map((dis) => {
      return {
        value: convertDistance(+dis.value, dis.unit, args.disUnit),
        date: dis.date
      }
    })

    const temperature = data.temperatures.map((tem) => {
      return {
        value: convertTemperature(+tem.value, tem.unit, args.temUnit),
        date: tem.date
      }
    })

    return {
      distance,
      temperature
    }
  }
}
