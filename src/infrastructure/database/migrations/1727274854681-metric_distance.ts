import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class metricDistance1727274854681 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TYPE IF EXISTS metric_distance_type, metric_temperature_type CASCADE;
      CREATE TYPE metric_distance_type AS ENUM ('meter', 'centimeter', 'inch', 'feet', 'yard');
      CREATE TYPE metric_temperature_type AS ENUM ('C', 'F', 'K');
    `);

    await queryRunner.query(`
      DROP TABLE IF EXISTS users CASCADE;
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone_number TEXT NULL,
        created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
        );
      `);

    await queryRunner.query(`
      DROP TABLE IF EXISTS metric_distances CASCADE;
      CREATE TABLE metric_distances (
        id SERIAL,
        user_id INTEGER NOT NULL,
        value NUMERIC NOT NULL,
        unit metric_distance_type NOT NULL,
        date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id, date),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) PARTITION BY RANGE (date);

      CREATE TABLE metric_distances_default PARTITION OF metric_distances DEFAULT;

      CREATE TABLE metric_distances_202409 PARTITION OF metric_distances
      FOR VALUES FROM ('2024-09-01') TO ('2024-10-01');
      
      CREATE TABLE metric_distances_202410 PARTITION OF metric_distances
      FOR VALUES FROM ('2024-10-01') TO ('2024-11-01');

      CREATE TABLE metric_distances_202411 PARTITION OF metric_distances
      FOR VALUES FROM ('2024-11-01') TO ('2024-12-01');

      CREATE TABLE metric_distances_202412 PARTITION OF metric_distances
      FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');
    `);

    await queryRunner.query(`
      DROP TABLE IF EXISTS metric_temperatures CASCADE;
      CREATE TABLE metric_temperatures (
        id SERIAL,
        user_id INTEGER NOT NULL,
        value NUMERIC NOT NULL,
        unit metric_temperature_type NOT NULL,
        date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id, date),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) PARTITION BY RANGE (date);

      CREATE TABLE metric_temperatures_default PARTITION OF metric_temperatures DEFAULT;
      
      CREATE TABLE metric_temperatures_202409 PARTITION OF metric_temperatures
      FOR VALUES FROM ('2024-09-01') TO ('2024-10-01');
      
      CREATE TABLE metric_temperatures_202410 PARTITION OF metric_temperatures
      FOR VALUES FROM ('2024-10-01') TO ('2024-11-01');

      CREATE TABLE metric_temperatures_202411 PARTITION OF metric_temperatures
      FOR VALUES FROM ('2024-11-01') TO ('2024-12-01');

      CREATE TABLE metric_temperatures_202412 PARTITION OF metric_temperatures
      FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('metric_distances');
    await queryRunner.dropTable('metric_temperatures');
    await queryRunner.query(`DROP TYPE metric_distance_type`);
    await queryRunner.query(`DROP TYPE metric_temperature_type`);
  }
}
