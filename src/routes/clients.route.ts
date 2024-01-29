import { getAllClients, registerClient } from "../controllers/clients.controller";
import { Router } from "express"

const clientRouter = Router();

clientRouter.get("/clients", getAllClients)
    .post("/registeclient", registerClient);

export default clientRouter;