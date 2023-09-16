import express from "express";
import { userValidation } from "../middlewares/auth";
import candidateControllers from "../controllers/candidate";

const candidateRouter = express.Router();

candidateRouter.get("/evaluate", userValidation , candidateControllers.getTests);

export default candidateRouter;