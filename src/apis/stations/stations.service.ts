import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from '../../entities/station.entity';
import { CreateStationDto } from '@/apis/stations/dto/create-station.dto';
import { UpdateStationDto } from '@/apis/stations/dto/update-station.dto';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>,
  ) {}

  findAll(): Promise<Station[]> {
    return this.stationRepository.find();
  }

  async findOne(id: number): Promise<Station | undefined> {
    return this.stationRepository.findOne({ where: { id } });
  }

  async create(createStationDto: CreateStationDto): Promise<Station> {
    const payload = {
      ...createStationDto,
      cctvUrls: Array.isArray(createStationDto.cctvUrls)
        ? createStationDto.cctvUrls.join(',')
        : createStationDto.cctvUrls,
    };
    const station = this.stationRepository.create(payload);
    return this.stationRepository.save(station);
  }

  async update(id: number, updateStationDto: UpdateStationDto): Promise<Station> {
    const payload = {
      ...updateStationDto,
      cctvUrls: Array.isArray(updateStationDto.cctvUrls)
        ? updateStationDto.cctvUrls.join(',')
        : updateStationDto.cctvUrls,
    };
    await this.stationRepository.update(id, payload);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.stationRepository.delete(id);
  }

}
