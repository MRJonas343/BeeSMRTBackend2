import { Router } from "express"
import { checkUserLogin } from "../middleware/checkUserLogin"
import { HangmanSingleController } from "../controllers/getHangmanSingle.controller"

const router = Router()

router.get("/", HangmanSingleController)

export { router }
