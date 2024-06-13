import { Router } from "express"
import { getHangmanLevelsController } from "../controllers/getHangmanLevels.controller"
import { checkJWT } from "../middleware/session"

const router = Router()

router.get("/", checkJWT, getHangmanLevelsController)

export { router }
