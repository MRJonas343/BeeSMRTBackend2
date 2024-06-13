import { Router } from "express"
import { logMiddleware } from "../middleware/log"
import { Hangman1vs1Controller } from "../controllers/getHangman1vs1.controller"

const router = Router()

//* Pendin añadir try catch
router.get("/", logMiddleware, Hangman1vs1Controller)

export { router }
