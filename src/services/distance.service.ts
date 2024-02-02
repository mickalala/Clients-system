import clientsRepository from "../repositories/clients.repository";

export default async function shortestDistanceService() {
    try {
        const clients = await clientsRepository.getAllClients();
        return distancesArrays(clients.rows);

    } catch (error) {
        console.log(error)
        throw { type: "Internal_server_error", message: "Erro no servidor" }
    }
}

function distancesArrays(clients) {
    const clientsArray = [{
        name: "sede",
        value: [0, 0],
    },];
    clients.map((c) => {
        clientsArray.push({ name: c.username, value: c.addresscoordinates })
    })
    return clientsArray;
}