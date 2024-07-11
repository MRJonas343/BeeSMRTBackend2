import { Router } from "express"
import { checkJWT } from "../middleware/session"
import { updateDataController } from "../controllers/updateData.controller"
import { validateUserDataToUpdate } from "../middleware/chekDataToUpdateMiddleware"
const router = Router()

router.post("/", checkJWT, validateUserDataToUpdate, updateDataController)

export { router }
