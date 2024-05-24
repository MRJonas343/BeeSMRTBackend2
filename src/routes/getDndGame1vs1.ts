import { Router } from "express"
import { logMiddleware } from "../middleware/log"

import { getDndItemsSingleModeController } from "../controllers/getDnd1vs1.controller"

const router = Router()

//* Pendin añadir try catch
router.get("/", logMiddleware, getDndItemsSingleModeController)

// router.post("/", createItem)

// router.put("/", updateItem)

// router.delete("/", deleteItem)

export { router }
