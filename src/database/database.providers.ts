/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { DataSource } from 'typeorm';
//Const-vars
let dataSource;

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      try {
        dataSource = new DataSource({
          type: 'mysql',
          host: process.env.DATABASE_HOST,
          port: 3306,
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: [__dirname + '/../**/*.entity.{js,ts}'],
          synchronize: true,
          logging: true, //Check custom logger
        });
      } catch (error) {
        console.log(error);
      }

      return dataSource.initialize();
    },
  },
];
