import Router from "express";
import clientRouter from "./clients.route";

const indexRouter = Router();

indexRouter.use(clientRouter)

export default indexRouter;