import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { Country } from "./models/country";
import { Paymonth } from "./models/paymonth";
import { Contact } from "./models/contact";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  synchronize: true,
  //logging logs sql command on the treminal
  logging: true,
  entities: [
    Country, 
    Paymonth,
    Contact
  ],
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
});