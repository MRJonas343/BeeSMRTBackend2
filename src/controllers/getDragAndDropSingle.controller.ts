// src/controllers/getDragAndDropSingle.controller.ts
import { Request, Response } from "express";
import { handlerHttp } from "../utils/errorHandler";
import { getDndItems } from "../models/GetDndItems1vs1.model";

const getDragAndDropSingleController = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extrae el valor del header 'EnglishLevel'
        const englishLevel = String(req.headers.englishlevel);

        if (!englishLevel) {
            res.status(400).send("Missing required header: englishlevel");
            return;
        }

        // Llama a la función del modelo con el valor extraído del header
        const items = await getDndItems(englishLevel);

        if (!items || items.length === 0) {
            res.status(404).send("No items found for the specified EnglishLevel");
            return;
        }

        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        handlerHttp(res, "Error_GET_DRAG_AND_DROP_ITEMS");
    }
};

export { getDragAndDropSingleController };
