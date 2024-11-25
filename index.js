import express from "express";
import sequelize from "./utils/db.js";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";

import questionPaperRoutes from "./routes/questionPaperRoutes.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'client', 'build')));

//routes
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use(questionPaperRoutes);

// PORT
const PORT = 5000;

sequelize
  .sync({ force: false })
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to sync the database:", error);
  });
