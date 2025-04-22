import { Sequelize } from "sequelize";

export const db = new Sequelize("rtq", "rtq-db", "secret", {
  dialect: "mysql",
});
