import { Router } from "express"
import { logMiddleware } from "../middleware/log"
import { contactMessageController } from "../controllers/contactMessage.controller"

const router = Router()

router.post("/", logMiddleware, contactMessageController)

export { router }
