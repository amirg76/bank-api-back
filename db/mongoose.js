import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-shard-00-00.y7roq.mongodb.net:27017,cluster0-shard-00-01.y7roq.mongodb.net:27017,cluster0-shard-00-02.y7roq.mongodb.net:27017/?ssl=true&replicaSet=atlas-gztgbt-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(URL, (error, mongoConnectionInstance) => {
  if (error) throw Error("Mongoose Connection!!, Error: " + error);
  if (!process.env.NODE_ENV) {
    const { host, port, name } = mongoConnectionInstance;
    console.log({ host, port, name });
  }
});

// mongoose.connect(
//   "mongodb://127.0.0.1/Bank",
//   (error, mongoConnectionInstance) => {
//     if (error) throw Error("Mongoose Connection!!, Error: " + error);
//     if (!process.env.NODE_ENV) {
//       const { host, port, name } = mongoConnectionInstance;
//       console.log({ host, port, name });
//     }
//   }
// );
