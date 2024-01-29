import { db } from "../database/database.connection";
import { CreateClient } from "../protocols/protocols";

async function getAllClients() {
    return await db.query("SELECT * FROM customers;")
}

async function registerClient(body: CreateClient) {
    return await db.query(`INSERT INTO customers("username","email","phone") VALUES ($1,$2,$3);`,
        [body.username, body.email, body.phone]);
}

const clientsRepository = { getAllClients, registerClient }

export default clientsRepository;