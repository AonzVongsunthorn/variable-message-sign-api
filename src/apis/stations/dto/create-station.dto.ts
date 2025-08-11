// src/apis/stations/dto/create-station.dto.ts
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateStationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lane: string;

  @IsString()
  @IsNotEmpty()
  apiEndpoint: string;

  @IsArray()
  cctvUrls: string; // comma-separated

  // Add other fields as needed
}
