import { Request, Response } from "express";
import { handlerHttp } from "../utils/errorHandler";
import { getDragAndDropGameLevels } from "../models/getDragAndDropLevels.model";
import { getUserTrophys } from "../models/getUserTotalTrohys.model";

const getDragAndDropLevelsController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Obtener headers
        const game = "DragAndDropGame"
        const userEmail = String(req.headers.email);

        // Verificar headers
        if (!game || !userEmail) {
            res.status(400).send("Missing required headers: game and email");
            return;
        }

        // Realizar consultas en paralelo
        const [dragAndDropLevels, userTrophys] = await Promise.all([
            getDragAndDropGameLevels(game),
            getUserTrophys(userEmail, game)
        ]);

        // Verificar resultados
        if (!dragAndDropLevels) {
            res.status(404).send("No levels found");
            return;
        }

        // Formatear datos
        const data = dragAndDropLevels.map((level) => {
            const { EnglishLevel, LevelName, levels: Level } = level;

            // Buscar trofeos del usuario para el nivel
            const userTrophy = userTrophys.find((trophy) => trophy.Level === Level);
            const Trophys = userTrophy ? userTrophy.Trophys : 0;

            return { EnglishLevel, LevelName, Level, Trophys };
        });

        
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        handlerHttp(res, "Error_GET_DRAG_AND_DROP_LEVELS");
    }
};

export { getDragAndDropLevelsController };
