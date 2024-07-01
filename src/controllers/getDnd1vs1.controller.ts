import { Request, Response } from "express";
import { handlerHttp } from "../utils/errorHandler";
import { getDndItems } from "../models/GetDndItems1vs1.model";

const levels = [
    "A1Level1", "A1Level2", "A1Level3", "A1Level4", "A1Level5", "A1Level6",
    "B1Level1", "B1Level2", "B1Level3", "B1Level4", "B1Level5", "B1Level6",
];

const getRandomLevel = (): string => {
    const randomIndex = Math.floor(Math.random() * levels.length);
    return levels[randomIndex];
};

const getDragAndDrop1vs1Controller = async (req: Request, res: Response): Promise<void> => {
    try {
        const levelName = getRandomLevel();

        const items = await getDndItems(levelName);

        if (!items || items.length === 0) {
            res.status(404).send("No items found for the specified level");
            return;
        }

        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        handlerHttp(res, "Error_GET_DRAG_AND_DROP_ITEMS");
    }
};

export { getDragAndDrop1vs1Controller };
