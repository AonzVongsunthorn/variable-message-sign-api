import { Module } from '@nestjs/common';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { Stations } from './stations';
import {HttpModule} from "@nestjs/axios";

@Module({
  controllers: [StationsController],
  providers: [StationsService, Stations],
  imports: [HttpModule],
})
export class StationsModule {}
