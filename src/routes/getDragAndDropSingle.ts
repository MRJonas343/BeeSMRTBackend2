import express from "express"
import { getDragAndDropSingleController } from "../controllers/getDragAndDropSingle.controller"
import { checkUserLogin } from "../middleware/checkUserLogin"

const router = express.Router()

router.get("/", checkUserLogin, getDragAndDropSingleController)

export { router }
