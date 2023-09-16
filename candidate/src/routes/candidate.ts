import express from "express";
import { userValidation } from "../middlewares/auth";
import candidateControllers from "../controllers/candidate";

const candidateRouter = express.Router();

candidateRouter.get("/tests", userValidation , candidateControllers.getTests);

export default candidateRouter;