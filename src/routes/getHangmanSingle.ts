import { Router } from "express"
import { checkUserLogin } from "../middleware/checkUserLogin"
import { Hangman1vs1Controller } from "../controllers/getHangman1vs1.controller"

const router = Router()

//* Pendin añadir try catch
router.get("/", checkUserLogin, Hangman1vs1Controller)

export { router }
