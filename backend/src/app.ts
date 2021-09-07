import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import morgan from "morgan";
import connect from "./db/connect";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routes/user.router";
import masterRouter from "./routes/master.router";
import adminRouter from "./routes/admin.router";
require("dotenv").config();

declare module "express-session" {
  export interface SessionData {
    name: string;
    id: string;
  }
}

const app = express();

const { PORT, SECRET, DBURL } = process.env;

connect();

app.use(morgan("dev"));
app.use(json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: SECRET!,
    resave: true,
    saveUninitialized: false,
    name: "myCookie", // указываем название наших куки
    cookie: { secure: false, maxAge: 60000000 },
    store: MongoStore.create({ mongoUrl: DBURL }),
  })
);

app.use("/user", userRouter);
app.use("/master", masterRouter);
app.use("/admin", adminRouter);

app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  next();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`PORT ${PORT}`);
});
