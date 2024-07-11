import { Router } from "express"
import { checkJWT } from "../middleware/session"
import { userDashboardController } from "../controllers/userDashboard.controller"

const router = Router()

router.get("/", checkJWT, userDashboardController)

export { router }
