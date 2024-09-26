import { MetricCreateDto, MetricGetListDto, MetricSummaryDto } from "../../../application/controller/metrics/metrics.controller.i";

type Distance = {
  value: number;
  unit: string;
};
export type CreateArgs = {
  userId: number;
};

export type MetricCreateArg = MetricCreateDto & CreateArgs;

export type MetricGetListArg = MetricGetListDto & CreateArgs;

export type MetricGetSummaryArg = MetricSummaryDto & CreateArgs;

