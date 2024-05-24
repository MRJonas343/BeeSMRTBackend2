import { Router } from "express"
import { logMiddleware } from "../middleware/log"
import { getImageController } from "../controllers/getImage.controller"

const router = Router()

//* Pendin añadir try catch
router.get("/", logMiddleware, getImageController)

export { router }
