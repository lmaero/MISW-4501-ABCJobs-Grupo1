const jwt = require('jsonwebtoken');
import jwt_decode from "jwt-decode";

export async function generateAccessToken(email: string): Promise<string> {
    const accessToken = jwt.sign({email: email }, process.env.TOKEN_SECRET, { expiresIn: "2d"});
    return accessToken;
}

export async function decodeToken(token: string):Promise<string> {
    const dataDecoded: any = jwt_decode(token);
    return dataDecoded;
}

