import Dao from "../database/dao";

const dao = new Dao();

export async function createUser(email: string, firstname: string, lastname: string, age: number) {
    const response = await dao.createUser(email, firstname, lastname, age);
    return response;
}