import { Router } from "express"
import {
	registerController,
	loginController,
} from "../controllers/auth.controller"
import { validateUserData } from "../middleware/createUserMiddleware"
import { validateUserDataLogin } from "../middleware/validateUserDataLogin"
import { verifyTokenController } from "../controllers/checkJWT.controller"

const router = Router()

router.post("/register", validateUserData, registerController)
router.post("/login", validateUserDataLogin, loginController)
router.post("/checkjwt", verifyTokenController)

export { router }
