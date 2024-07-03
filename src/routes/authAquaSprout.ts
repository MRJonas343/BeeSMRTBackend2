import { Router } from "express"
import {
	loginControllerAquaSprout,
	registerControllerAquaSprout,
} from "../controllers/authAquaSprout.controller"
const router = Router()

router.post("/signup", registerControllerAquaSprout)
router.get("/login", loginControllerAquaSprout)

export { router }
