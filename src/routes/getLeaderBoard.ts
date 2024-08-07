import { Router } from "express"
import { getLeaderBoard } from "../controllers/getLeaderBoard.controller"
import { checkJWT } from "../middleware/session"

const router = Router()

router.get("/", checkJWT, getLeaderBoard)

export { router }
