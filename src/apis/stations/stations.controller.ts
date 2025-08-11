import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { StationsService } from './stations.service';
import { Station } from '../../entities/station.entity';
import { plainToInstance } from 'class-transformer';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from '@/apis/stations/dto/update-station.dto';

export interface StationResponse {
    id: number;
    name: string;
    lane: string;
    apiEndpoint: string;
    cctvUrls: string | string[];
    createdAt: Date; // or Date, depending on serialization
    updatedAt: Date; // or Date, depending on serialization
}

@Controller('stations')
export class StationsController {
    constructor(private readonly stationsService: StationsService) {}

    @Get()
    async findAll(): Promise<{ data: StationResponse[] }> {
        const stations = await this.stationsService.findAll();
        const data = plainToInstance(Station, stations, { excludeExtraneousValues: true })
          .map((station: any) => ({
              ...station,
              cctvUrls: station.cctvUrls ? station.cctvUrls.split(',').map(url => url.trim()) : [],
          }));
        return { data };
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<{ data: StationResponse }> {
        const station = await this.stationsService.findOne(id);
        if (!station) {
            throw new NotFoundException('Station not found');
        }
        const data: StationResponse = plainToInstance(Station, station, { excludeExtraneousValues: true });
        // Convert cctvUrls to array
        data.cctvUrls = data.cctvUrls ? data.cctvUrls.toString().split(',').map((url: string) => url.trim()) : [];
        return { data };
    }

    @Post()
    async create(@Body() createStationDto: CreateStationDto): Promise<{ data: StationResponse }> {
        const station = await this.stationsService.create(createStationDto);
        const data: StationResponse = plainToInstance(Station, station, { excludeExtraneousValues: true });
        data.cctvUrls = data.cctvUrls ? data.cctvUrls.toString().split(',').map((url: string) => url.trim()) : [];
        return { data };
    }

    @Patch(':id')
    async update(
      @Param('id') id: number,
      @Body() updateStationDto: UpdateStationDto
    ): Promise<{ data: StationResponse }> {
        const station = await this.stationsService.update(id, updateStationDto);
        if (!station) throw new NotFoundException('Station not found');
        const data: StationResponse = plainToInstance(Station, station, { excludeExtraneousValues: true });
        data.cctvUrls = data.cctvUrls ? data.cctvUrls.toString().split(',').map((url: string) => url.trim()) : [];
        return { data };
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<{ message: string }> {
        const result = await this.stationsService.remove(id);
        return { message: 'Station deleted successfully' };
    }
}
