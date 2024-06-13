import { Request, Response } from "express";
import { handlerHttp } from "../utils/errorHandler";
import { getHangmanItems1vs1 } from "../models/GetHangmanGame1vs1.model";

const Hangman1vs1Controller = async (req: Request, res: Response): Promise<void> => {
    try {
        const englishLevel = String(req.headers.englishlevel);

        if (!englishLevel) {
            res.status(400).send("Missing required header: englishlevel");
            return;
        }

        const levels = await getHangmanItems1vs1(englishLevel);

        if (!levels || levels.length === 0) {
            res.status(404).send("No levels found for the specified EnglishLevel");
            return;
        }

        const formattedLevels = levels.map(level => ({
            Word: level.word,
            Hint: level.hint
        }));

        res.status(200).json(formattedLevels);
    } catch (error) {
        console.error(error);
        handlerHttp(res, "Error_GET_HANGMAN_LEVELS");
    }
};

export { Hangman1vs1Controller };
