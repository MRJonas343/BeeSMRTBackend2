import { Router } from "express"
import { checkJWT } from "../middleware/session"
import { userDashboardController } from "../controllers/userDashboard.controller"

const router = Router()

//* Pendin añadir try catch
router.get("/", checkJWT, userDashboardController)

export { router }
