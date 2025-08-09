import { Module } from '@nestjs/common';
import { StationsModule } from './stations/stations.module';

@Module({
  imports: [StationsModule],
})
export class ApiModule {}
