import { Router } from "express"
import {
	registerController,
	loginController,
} from "../controllers/auth.controller"
import { validateUserData } from "../middleware/createUserMiddleware"
import { validateUserDataLogin } from "../middleware/validateUserDataLogin"

const router = Router()

router.post("/register", validateUserData, registerController)
router.post("/login", validateUserDataLogin, loginController)

export { router }
