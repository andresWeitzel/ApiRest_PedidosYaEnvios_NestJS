//External
require('dotenv').config();
import { DataSource } from 'typeorm';
//Const-vars
let dataSource;

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      try {
        dataSource = new DataSource({
          // type: process.env.DATABASE_DIALECT,
          // host: process.env.DATABASE_HOST,
          // port: process.env.DATABASE_PORT,
          // username: process.env.DATABASE_USERNAME,
          // password: process.env.DATABASE_PASSWORD,
          // database: process.env.DATABASE_NAME,
          // entities: [__dirname + '/**/*.entity{.ts,.js}'],
          // synchronize: true,
          // logging: true//Check custom logger
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'db_pedidosyaenvios_mysql',
          //entities: [__dirname + '/**/*.entity{.ts,.js}'],
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
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
