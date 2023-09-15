const jwt = require('jsonwebtoken');
export async function generateAccessToken(email: string): Promise<string> {
    const accessToken = jwt.sign({username: email }, process.env.TOKEN_SECRET, { expiresIn: 2});
    return accessToken;
}