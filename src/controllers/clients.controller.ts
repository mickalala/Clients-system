import { Request, Response } from "express";
import clientsService from "../services/clients.service";
import httpStatus from "http-status";

//função que lista todos os clientes:
export async function getAllClients(req: Request, res: Response) {
    try {
        const clients = await clientsService.getAllClients();
        res.status(httpStatus.OK).send(clients)
    } catch (error) {
        console.log(error)
    }
}

//função que registra o cliente:
export async function registerClient(req: Request, res: Response) {
    const { username, email, phone } = req.body;
    const body = { username, email, phone };
    try {
        await clientsService.registerClient(body)
        res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        console.log(error)
    }
}

//função para filtrar cliente, deve ser recebido como body o tipo(username, email ou phone) e o valor:
export async function filterClient(req: Request, res: Response) {
    const { filter, value } = req.body;
    try {
        const client = await clientsService.filterClient(filter, value)
        res.status(httpStatus.OK).send(client)
    } catch (error) {
        console.log(error)
    }
}



