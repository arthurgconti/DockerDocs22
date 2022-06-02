import express from "express";
import rotas from "./routes.js";
import cors from "cors";
import helmet from "helmet";

const app = express();
const port = 3333;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers","Content-Type");
  app.use(cors());
  next();
});

app.use(express.json());
app.use(rotas);
app.use(helmet());

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
