import { Router } from "express"
import { getMemoryGameLevelsController } from "../controllers/getMemoryGameLevels.controller"
import { checkJWT } from "../middleware/session"

const router = Router()

router.get("/", checkJWT, getMemoryGameLevelsController)

export { router }
