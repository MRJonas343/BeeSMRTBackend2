import { Router } from "express"
import { multerMiddleware } from "../middleware/multerUploadImg"
//*Upload img is not a controller, it is a function
//* in next versions it will be used just as a utility function
//* and not as a controller, this is just for testing purposes
import { uploadImgController } from "../controllers/uploadImg.controller"

const router = Router()

//* Pendin añadir try catch
router.post("/", multerMiddleware, uploadImgController)

export { router }
