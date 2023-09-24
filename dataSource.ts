import { DataSource } from "typeorm";

// const ConnectDatabase = async () => {
//   try {
const dataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: Number(process.env.DATABASE_PORT),
  // username: process.env.USER,
  username: "postgres",
  password: "root1234",
  database: "mor",
  synchronize: true,
  entities: ["entities/*.ts"],
  // subscribers: ["src/hooks/*.subscriber.ts"],
  // logger: "advanced-console",
  // logging: "all",
})
//     await AppDataSource.initialize()
//     console.log("Data Source has been initialized!")
//   }
//   catch (error) {
//     console.error("Error during Data Source initialization", error)
//   }
// }

export default dataSource