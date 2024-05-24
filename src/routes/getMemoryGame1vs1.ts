import { Router } from "express"
import { logMiddleware } from "../middleware/log"
import { MemoryGame1vs1Controller } from "../controllers/getMemoryGame1vs1.controller"

const router = Router()

//* Pendin añadir try catch
router.get("/", logMiddleware, MemoryGame1vs1Controller)

export { router }
