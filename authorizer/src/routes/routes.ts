import {Express, Request, Response} from "express";
import {createUser} from "../controllers/user";

// Importing the modules
const express = require("express")

// Creating express Router
const router = express.Router()

const { Client } = require('pg');
router.get("/", async (req: Request, res: Response) => {

    // const client = new Client({
    //     user: 'postgres',
    //     host: 'localhost',
    //     database: 'postgres',
    //     password: 'postgres',
    //     port: 5432,
    // });
    //
    // client.connect();
    //
    // const query = `CREATE TABLE users (
    //     email varchar,
    //     firstName varchar,
    //     lastName varchar,
    //     age int
    // );`;
    //
    // try {
    //     const res = await client.query(query);
    //     console.log('Table is successfully created');
    // } catch (err) {
    //     console.log(err);
    // }
    let a = "a";
    let b = "b";
    let c = "c";
    let d = 10;

    const res1 =await createUser(a, b, c, d);

    res.send( res1);
})

module.exports = router;