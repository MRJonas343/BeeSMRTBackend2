import { Router } from "express"
import { logMiddleware } from "../middleware/log"
import { MemoryGameSingleController} from "../controllers/getMemoryGameSingle.controller"

const router = Router()

//* Pendin añadir try catch
router.get("/", logMiddleware, MemoryGameSingleController)

export { router }
