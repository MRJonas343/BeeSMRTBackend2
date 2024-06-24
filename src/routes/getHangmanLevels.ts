import { Router } from "express"
import { getHangmanLevelsController } from "../controllers/getHangmanLevels.controller"
import { checkUserLogin } from "../middleware/checkUserLogin"

const router = Router()

router.get("/", checkUserLogin, getHangmanLevelsController)

export { router }
