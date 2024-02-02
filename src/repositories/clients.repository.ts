import { db } from "../database/database.connection";
import { CreateClient } from "../protocols/protocols";

//Onde eu tenho meu db e posso escrever minhas querys pro banco me retornar oque quero
//função que pede pro banco listar meus clients:
async function getAllClients() {
    return await db.query("SELECT * FROM customers;")
}

//função que pede pro banco criar meus clients:
async function registerClient(body: CreateClient) {
    return await db.query(`INSERT INTO customers("username","email","phone","addresscoordinates") VALUES ($1,$2,$3,$4);`,
        [body.username, body.email, body.phone, body.addresscoordinates]);
}

//função que filtra por nome do client:
async function getByName(username:string) {
    return await db.query(` SELECT * FROM customers WHERE username = $1;`,[username]);
}

//função que filtra por email do client:
async function getByEmail(email:string) {
    return await db.query(` SELECT * FROM customers WHERE email = $1;`,[email]);
}

//função que filtra por telefone do client:
async function getByPhone(phone:number) {
    return await db.query(` SELECT * FROM customers WHERE phone = $1;`,[phone]);
}

const clientsRepository = { getAllClients, registerClient, getByName, getByEmail, getByPhone }

export default clientsRepository;