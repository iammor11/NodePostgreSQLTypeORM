import * as dotenv from "dotenv"
import express, { Express, Request, Response, NextFunction } from "express"
import cors from "cors"
import ConnectDatabase from "./connectDatabase"
import verifyToken from "./middlewares/verifyToken"
import todoRoutes from "./routes/todo"
import userRoutes from "./routes/user"

const app: Express = express()
dotenv.config()

ConnectDatabase()

app.use(cors({
  credentials: true
}))
app.set("trust proxy", true)
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*')
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept, Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }
  next()
})

app.use('/api/user', userRoutes)
app.use('/api/todo', verifyToken, todoRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found")
  res.status(404)
  next(error)
})

const port: number = Number(process.env.PORT) || 4001

app.listen(port, () => {
  console.log("Server has started on port " + port)
})