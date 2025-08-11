import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Station } from '../../src/entities/station.entity';

const defaultStations: Partial<Station>[] = [
  {
    name: 'Station A',
    lane: 'Lane 1',
    api_endpoint: 'http://api.example.com/station-a',
    cctv_urls: 'http://cctv.example.com/station-a',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Station B',
    lane: 'Lane 2',
    api_endpoint: 'http://api.example.com/station-b',
    cctv_urls: 'http://cctv.example.com/station-b,http://cctv.example.com/station-a-2',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default class StationSeeds implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    const values: QueryDeepPartialEntity<Station>[] = JSON.parse(JSON.stringify(defaultStations)) as QueryDeepPartialEntity<Station>[];
    await connection.createQueryBuilder().insert().into(Station).values(values).execute();
  }
}
