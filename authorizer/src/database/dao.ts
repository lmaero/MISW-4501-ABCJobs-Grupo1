const { Client } = require('pg');
const bind  = require('pg-bind');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

client.connect();

export async function daoCreateUser(email: string, firstname: string, lastname: string, age: number) {
    console.log(email);
    const query =
    `INSERT INTO users ("email", "firstname", "lastname", "age") VALUES (:email, :firstname, :lastname, :age)`;

    const queryPrepared = bind(query, {
        email: email,
        firstname: firstname,
        lastname: lastname,
        age: age
    });

    try {
        const res = await client.query(queryPrepared);
        console.log('User successfully created');
    } catch (err) {
        console.log(err);
    }

    return {msg: "200"}
}