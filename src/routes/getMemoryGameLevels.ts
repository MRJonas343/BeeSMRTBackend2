import { Router } from "express"
import { getMemoryGameLevelsController } from "../controllers/getMemoryGameLevels.controller"
import { checkUserLogin } from "../middleware/checkUserLogin"

const router = Router()

router.get("/", checkUserLogin, getMemoryGameLevelsController)

export { router }
