require("dotenv").config();
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
import generalRouter from "./routes/general.router";
import categoryRouter from "./routes/category.router";


declare module "express-session" {
  export interface SessionData {
    user: {
      name: string;
      id: string;

    }
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
console.log('---->', DBURL);

app.use(
  session({
    secret: SECRET!,
    resave: false,
    saveUninitialized: false,
    name: "myCookie", // указываем название наших куки
    cookie: { secure: false, maxAge: 60000000 },
    store: MongoStore.create({ mongoUrl: DBURL }),
  })
);

app.use("/", generalRouter);
app.use("/user", userRouter);
app.use("/master", masterRouter);
app.use("/admin", adminRouter);
app.use("/categories", categoryRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`PORT ${PORT}`);
});
