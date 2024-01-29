import clientsRepository from "../repositories/clients.repository";

async function getAllClients() {
    try {
        const clients = await clientsRepository.getAllClients();
        return clients.rows;
    } catch (error) {
        console.log(error)
    }
}

const clientsService = { getAllClients }

export default clientsService;