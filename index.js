import { app } from "/app.js";
import express from "express";
import "/db/mongoose.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// display index.html
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
// connect to server
app.listen(PORT, (error) => {
  if (error) console.error("Error: ", error);
  console.log("SERVER IS UP AND RUNNING ON PORT ", PORT);
});
