import { Router } from "express"
import { getDragAndDropSingleController } from "../controllers/getDragAndDropSingle.controller"
import { checkUserLogin } from "../middleware/checkUserLogin"

const router = Router()

router.get("/", checkUserLogin, getDragAndDropSingleController)

export { router }
