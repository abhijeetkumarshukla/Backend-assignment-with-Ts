import { MongoClient, Db } from "mongodb";

const uri =
  "mongodb+srv://shuklaabhijeet510:node_assignment@cluster0.px544.mongodb.net/node_assignment";
// const uri = 'mongodb://localhost:27017/node_assignment'
const client = new MongoClient(uri);

let db: Db;

export async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db("node_assignment");
    console.log("Connected to MongoDB");
  }
  return db;
}
