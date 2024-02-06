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
        throw error.message;
    }
}

async function filterClient(filter: any, value: any) {
    try {
        let client;
        if (filter == "username") {
            client = await clientsRepository.getByName(value)
        } else if (filter == "email") {
            client = await clientsRepository.getByEmail(value)
        } else {
            client = await clientsRepository.getByPhone(value)
        }
        return client.rows[0];
    } catch (error) {
        console.log(error)
    }
}
const clientsService = { getAllClients, registerClient, filterClient }

export default clientsService;