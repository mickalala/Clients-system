import { CreateClient } from "../protocols/protocols";
import clientsRepository from "../repositories/clients.repository";

async function getAllClients() {
    try {
        const clients = await clientsRepository.getAllClients();
        return clients.rows;
    } catch (error) {
        console.log(error);
    }
}

async function registerClient(body: CreateClient) {
    try {
        const client = await clientsRepository.registerClient(body);
        return client;
    } catch (error) {
        console.log(error)
    }
}

const clientsService = { getAllClients, registerClient }

export default clientsService;