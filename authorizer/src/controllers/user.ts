import {daoCreateUser} from "../database/dao";

export async function createUser(email: string, firstname: string, lastname: string, age: number) {
    const response = await daoCreateUser(email, firstname, lastname, age);
    return response;
}