import express from 'express'
import indexRouter from "./routers/indexRouter";
import authRouter from "./routers/authRouter";
import categoryRouter from "./routers/categoryRouter";
import groupRouter from "./routers/groupRouter";
import boardRouter from "./routers/boardRouter";

import errHandler from "./lib/errHandler";
// import indexRouter from "./routers/index";
import "dotenv/config";


// const cors = require('cors');
const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/group", groupRouter);
app.use("/board", boardRouter);

app.use(errHandler);

export default app;