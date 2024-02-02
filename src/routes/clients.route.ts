import { filterClient, getAllClients, registerClient, minDistance } from "../controllers/clients.controller";
import { Router } from "express"

const clientRouter = Router();

//rotas para fazer as requisições,
// /clients é a rota que lista os clientes e /registerclient onde podemos registrar o cliente
clientRouter.get("/clients", getAllClients)
    .post("/registerclient", registerClient)
    .get("/filter", filterClient)
    .get("/distance",minDistance);

export default clientRouter;