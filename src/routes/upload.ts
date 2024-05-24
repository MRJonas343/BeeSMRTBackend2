import { Router } from "express"
import { multerMiddleware } from "../middleware/multerUploadImg"
import { UploadImg } from "../controllers/upload.controller"

const router = Router()

//* Pendin añadir try catch
router.post("/", multerMiddleware, UploadImg)

export { router }
