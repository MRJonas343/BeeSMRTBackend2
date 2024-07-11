import { Router } from "express"
import { checkUserLogin } from "../middleware/checkUserLogin"
import { MemoryGameSingleController } from "../controllers/getMemoryGameSingle.controller"

const router = Router()

router.get("/", checkUserLogin, MemoryGameSingleController)

export { router }
