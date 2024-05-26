import { Router } from "express"
import { logMiddleware } from "../middleware/log"
import { contactMessageController } from "../controllers/contactMessage.controller"

const router = Router()

//* Pendin añadir try catch
router.post("/", logMiddleware, contactMessageController)

export { router }
