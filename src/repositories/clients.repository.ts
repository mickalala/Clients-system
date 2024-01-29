import { db } from "../database/database.connection";

async function getAllClients() {
    return await db.query("SELECT * FROM customers;")
}

const clientsRepository = { getAllClients }

export default clientsRepository;