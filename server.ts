import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "dotenv/config";
import * as admin from "firebase-admin";
import * as Middlewares from "./src/middlewares";
import * as Routers from "./src/routers";
import * as Constants from "./src/globals/constants";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    "./grafiny-1ad98-firebase-adminsdk-nx0m2-64fe154afd.json",
    "utf8"
  )
);
//import * as Utils from "./src/utils";

const app = express();

// Middlewares
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app
  .use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://www.thunderclient.com",
      ],
      credentials: true,
      exposedHeaders: ["set-cookie"],
    })
  )
  .use(helmet())
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser());

// Routers
app.use(`${Constants.System.ROOT}/`, Routers.Health);
app.use(`${Constants.System.ROOT}/auth`, Routers.authRouter);
app.use(`${Constants.System.ROOT}/institute`, Routers.instituteRouter);
app.use(`${Constants.System.ROOT}/department`, Routers.departmentRouter);
app.use(`${Constants.System.ROOT}/course`, Routers.courseRouter);
app.use(`${Constants.System.ROOT}/topic`, Routers.topicRouter);
app.use(`${Constants.System.ROOT}/items`, Routers.itemsRouter);
app.use(`${Constants.System.ROOT}/profile`, Routers.profileRouter);

// Error Handlers
app.use(Middlewares.Error.errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
