import { DataSource } from "typeorm";
import Entities from "./entities";

const ConnectDatabase = async () => {
  try {
    const AppDataSource = await new DataSource({
      type: "postgres",
      host: process.env.HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      synchronize: false,
      entities: Entities,
      // subscribers: ["src/hooks/*.subscriber.ts"],
      // logger: "advanced-console",
      // logging: "all",
    })
    await AppDataSource.initialize()
    console.log("Data Source has been initialized!")
  }
  catch (error) {
    console.error("Error during Data Source initialization", error)
  }
}

export default ConnectDatabase