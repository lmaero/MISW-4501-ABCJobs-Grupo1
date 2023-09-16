import { Request, Response } from "express";

const getTests = async (req: Request, res: Response): Promise<Response> => {
    const { user } = req.headers;

    if (!user) {
        return res.status(400).json({ message: "No user provided" });
    }
    return res.status(200).json({ message: "getTests" });
}

export default {
    getTests
}