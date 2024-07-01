import { Router } from "express";
import { HangmanGame1vs1Controller } from "../controllers/getHangmanGame1vs1.controller";

const router = Router();

router.get("/", HangmanGame1vs1Controller);

export { router };
