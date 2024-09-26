import { DistanceFactory } from '../../../infrastructure/factory/metric-distance.factory';
import { TemperatureFactory } from '../../../infrastructure/factory/metric-temperature.factor';

export type MetricCreateEntities = {
  distanceEntity: DistanceFactory;
  temperatureEntity: TemperatureFactory;
};

export type MetricResponse = {
  value: number;
  unit: string;
  date: Date;
}

export type DataResponseDto = {
  temperatures: MetricResponse[];
  distances: MetricResponse[];
}