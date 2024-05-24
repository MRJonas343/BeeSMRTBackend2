import { Router } from "express"
import { getProtectedResourcesController } from "../controllers/protectRoute.controller"
import { checkJWT } from "../middleware/session"

//* Estas es una ruta protegida, solo se puede acceder
//* si el usuario esta logeado con un token valido

const router = Router()

router.get("/", checkJWT, getProtectedResourcesController)

export { router }
