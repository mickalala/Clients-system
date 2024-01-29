import { Request, Response } from "express";
import clientsService from "../services/clients.service";
import httpStatus from "http-status";

async function getAllClients(req: Request, res: Response) {
    try {
        const clients = await clientsService.getAllClients();
        res.status(httpStatus.OK).send(clients)
    } catch (error) {
        console.log(error)
    }
}

async function registerClient(req: Request, res: Response) {
    const { username, email, phone } = req.body;
    const body = { username, email, phone };
    try {
        await clientsService.registerClient(body)
        res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        console.log(error)
    }
}

export { getAllClients, registerClient };

