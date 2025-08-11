import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from '../../entities/station.entity';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Station])],
  providers: [StationsService],
  controllers: [StationsController],
})
export class StationsModule {}
