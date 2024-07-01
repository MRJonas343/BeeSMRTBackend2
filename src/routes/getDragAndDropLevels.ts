import { Router } from "express";
import { checkUserLogin } from "../middleware/checkUserLogin";
import { getDragAndDropLevelsController } from "../controllers/getDragAndDropLevels.controller";

const router = Router();

// Configurar la ruta para el endpoint /getDragAndDropLevels
router.get("/", checkUserLogin, getDragAndDropLevelsController);

export { router };
