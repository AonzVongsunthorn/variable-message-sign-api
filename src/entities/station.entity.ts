import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity({ name: 'stations' })
export class Station {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  lane: string;

  @Column({ name: 'api_endpoint' })
  @Expose({ name: 'apiEndpoint' })
  apiEndpoint: string;

  @Column({ name: 'cctv_urls' })
  @Expose({ name: 'cctvUrls' })
  cctvUrls: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Expose({ name: 'createdAt' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Expose({ name: 'updatedAt' })
  updatedAt: Date;
}
