import { Router } from "express"
import { logMiddleware } from "../middleware/log"
import { getHangman1vs1Controller } from "../controllers/getHangman1vs1.controller.ts"

const router = Router()

//* Pendin añadir try catch
router.get("/", logMiddleware, getHangman1vs1Controller)

export { router }
