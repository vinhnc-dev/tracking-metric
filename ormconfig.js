const setOrmConfig = async () => {
  return [
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      synchronize: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/infrastructure/database/migrations/*.js'],
      cli: { migrationsDir: 'src/database/migrations' },
    },
  ];
};

module.exports = setOrmConfig();
