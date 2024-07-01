import { Router } from "express"
import { checkUserLogin } from "../middleware/checkUserLogin"

import { getDragAndDrop1vs1Controller} from "../controllers/getDnd1vs1.controller"

const router = Router()

//* Pendin añadir try catch
router.get("/", checkUserLogin, getDragAndDrop1vs1Controller)

// router.post("/", createItem)

// router.put("/", updateItem)

// router.delete("/", deleteItem)

export { router }
