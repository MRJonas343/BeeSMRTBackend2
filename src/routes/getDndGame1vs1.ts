import { Router } from "express"
import { getDragAndDrop1vs1Controller } from "../controllers/getDnd1vs1.controller"

const router = Router()

router.get("/", getDragAndDrop1vs1Controller)

export { router }
