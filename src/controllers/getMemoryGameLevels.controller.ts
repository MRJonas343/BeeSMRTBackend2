// src/controllers/getMemoryGameLevels.controller.ts
import { Request, Response, response } from "express";
import { handlerHttp } from "../utils/errorHandler";
import { getMemoryGameLevelsModels } from "../models/getMemoryGameLevels.model";


const getMemoryGameLevelsController = async (req: Request, res: Response) => {
    try {
        console.log(req.headers)
        const EnglishLevel = String(req.headers.englishlevel);
        const Game = String(req.headers.game);
        console.log(Game)
        const Level = String(req.headers.level)

        if (!EnglishLevel || !Game || !Level) {
            res.status(400).send("Missing required headers");
            return;
        }

        const data = await getMemoryGameLevelsModels (Game)
        console.log(data)
        res.send(data)
        res.status(200)

        
        
    } catch (error) {
        console.error(error);
        handlerHttp(res, "Error_GET_MEMORY_GAME_LEVELS");
    }
};


export { getMemoryGameLevelsController };
