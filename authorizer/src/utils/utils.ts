const jwt = require('jsonwebtoken');
import jwt_decode from "jwt-decode";

export async function generateAccessToken(email: string): Promise<string> {
    const accessToken = jwt.sign({email: email }, process.env.TOKEN_SECRET, { expiresIn: "24h"});
    return accessToken;
}

export async function decodeToken(token: string):Promise<string> {
    const dataDecoded: any = jwt_decode(token);
    return dataDecoded;
}

export async function tokenExpired(expiredTime: number) {
    let isExpiredToken = false;
    let dateNow = new Date();
    if(expiredTime < dateNow.getTime()/1000) {
        isExpiredToken = true;
    }
    return isExpiredToken;
}
