import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { STATIONS_TABLE } from '../../src/constants';

export class Station1754929211189 implements MigrationInterface {

    private readonly tableName: string = STATIONS_TABLE;

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
          new Table({
              name: this.tableName,
              columns: [
                  {
                      name: 'id',
                      type: 'integer',
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: 'increment',
                  },
                  {
                      name: 'name',
                      type: 'varchar',
                  },
                  {
                      name: 'lane',
                      type: 'varchar',
                  },
                  {
                      name: 'api_endpoint',
                      type: 'varchar',
                  },
                  {
                      name: 'cctv_urls',
                      type: 'varchar',
                  },
                  {
                      name: 'created_at',
                      type: 'timestamp',
                      default: 'now()',
                  },
                  {
                      name: 'updated_at',
                      type: 'timestamp',
                      default: 'now()',
                      onUpdate: 'now()',
                  }
              ],
          }),
          true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table: Table = await queryRunner.getTable(this.tableName);
        await queryRunner.dropTable(this.tableName);
    }

}
