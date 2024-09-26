import { User } from '../entitiy/user.entity';

export class TemperatureFactory {
  user: User;
  value: number;
  unit: string;
  date: Date;

  constructor(params: any) {
    this.user = params.user;
    this.value = params.value;
    this.unit = params.unit;
    this.date = params.date;
  }
}
