import { Router } from "express";
import { getUserTrophysController } from "../controllers/getUserTrophys.controller";

const router = Router();


router.post("/", getUserTrophysController);

export { router };
