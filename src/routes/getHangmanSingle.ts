import { Router } from "express"
import { checkUserLogin } from "../middleware/checkUserLogin"
import { HangmanSingleController } from "../controllers/getHangmanSingle.controller"

const router = Router()

//* Pendin añadir try catch
router.get("/", checkUserLogin, HangmanSingleController)

export { router }
