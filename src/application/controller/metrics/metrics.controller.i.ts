import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const DistanceUnit = ['meter', 'centimeter', 'inch', 'feet', 'yard'];
export type DistanceUnitType = typeof DistanceUnit[number]; 

export const TemperatureUnit = ['C', 'F', 'K'];
export type TemperatureUnitType = typeof DistanceUnit[number]; 

export const TypeMetric = ['distance', 'temperature'];

class DistanceDto {
  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsEnum(DistanceUnit)
  unit: string;
}

class TemperatureDto {
  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsEnum(TemperatureUnit)
  unit: string;
}

export class MetricCreateDto {
  @ApiProperty({ type: DistanceDto })
  @IsOptional()
  distance?: DistanceDto;

  @ApiProperty({ type: TemperatureDto })
  @IsOptional()
  temperature?: TemperatureDto;

  @ApiProperty()
  @IsDateString()
  date: Date;
}

export class MetricGetListDto {
  @IsString()
  @IsEnum(TypeMetric)
  type: string;

  @IsString()
  @IsEnum([...DistanceUnit,...TemperatureUnit])
  unit: string;
}

export class MetricSummaryDto {
  @IsString()
  @IsEnum(TemperatureUnit)
  temUnit: string;

  @IsString()
  @IsEnum(DistanceUnit)
  disUnit: string;

  @IsString()
  period: string
}
