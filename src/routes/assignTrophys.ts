import { Router } from "express"
import { validateDataAssignTrophys } from "../middleware/validateDataAssignTrophys"
import { assignTrophysController } from "../controllers/assignTrophys.controller"

const router = Router()

router.post("/", validateDataAssignTrophys, assignTrophysController)

export { router }
