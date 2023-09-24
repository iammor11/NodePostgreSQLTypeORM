import { config } from 'dotenv';

config();

export const {
  MONGO_USER,
  MONGO_PASSWORD,
  CLUSTER_URL,
  SECRET_KEY
} = process.env as {
  [key: string]: string;
}