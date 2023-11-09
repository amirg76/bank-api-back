import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.y7roq.mongodb.net/?retryWrites=true&w=majority`;

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
