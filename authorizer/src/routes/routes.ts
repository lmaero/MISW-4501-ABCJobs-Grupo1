import {Express, Request, Response} from "express";
import {authenticateUser} from "../controllers/auth";




// Importing the modules
const express = require("express")

// Creating express Router
const router = express.Router()

router.get("/auth", async (req: Request, res: Response) => {

    const n = 9;
    const userInfo = {
        personId: n,
        country: "mex",
        lenguages: "mex",
        academicalDataId: n,
        technicalDataId: n,
        workDataId: n,
        isAvailable: false,
        softSkills: "mex",
        interviewId: n,
        email: "kakak",
        password: "aajaja",
        token: "12344",
    }


    const data = await authenticateUser(userInfo)
    res.send( {data});
})

router.get("/auth/me", async (req: Request, res: Response) => {
    res.send( {msg: "pong"});
})

router.get("/auth/ping", async (req: Request, res: Response) => {
    res.send( {msg: "pong"});
})




module.exports = router;