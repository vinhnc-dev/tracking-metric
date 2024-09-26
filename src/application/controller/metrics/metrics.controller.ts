import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { MetricsUsecase } from '../../../application/usecase/metrics';
import { MetricCreateDto, MetricGetListDto, MetricSummaryDto } from './metrics.controller.i';

@Controller('metric')
@ApiTags('Metrics')
export class MetricsController {
  constructor(private readonly usecase: MetricsUsecase) {}

  @Post()
  async createMetric(
    @CurrentUser() user: { id: number },
    @Body() body: MetricCreateDto
  ) {
    try {
      const args = {
        userId: user.id,
        ...body,
      };
      await this.usecase.createMetric(args);
      return {
        success: true,
        message: 'Create successfully!',
        httpStatus: HttpStatus.CREATED,
      };
    } catch (_) {
      return {
        success: false,
        message: `Something was wrong!`,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get('list')
  async getMetricList(
    @CurrentUser() user: { id: number },
    @Query() params: MetricGetListDto
  ) {
    try {
      const data = await this.usecase.getMetricList({ ...params, userId: user.id });

      return {
        success: true,
        message: 'Create successfully!',
        httpStatus: HttpStatus.OK,
        data
      };
    } catch (_) {
      return {
        success: false,
        message: `Something was wrong!`,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get('summary')
  async getMetricSummary(
    @CurrentUser() user: { id: number },
    @Query() params: MetricSummaryDto
  ) {
    try {
      const data = await this.usecase.getMetricSummary({ ...params, userId: user.id });

      return {
        success: true,
        message: 'Create successfully!',
        httpStatus: HttpStatus.OK,
        data
      };
    } catch (_) {
      return {
        success: false,
        message: `Something was wrong!`,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
