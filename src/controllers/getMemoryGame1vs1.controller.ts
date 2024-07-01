import { Request, Response } from "express";
import { handlerHttp } from "../utils/errorHandler";
import { getMemoryGameItems1vs1 } from "../models/GetMemoryGameItems1vs1.model";


const levels = [
    "A1Level1", "A1Level2", "A1Level3", "A1Level4", "A1Level5", "A1Level6",
    "B1Level1", "B1Level2", "B1Level3", "B1Level4"
];

// Función para seleccionar un nivel aleatorio
const getRandomEnglishLevel = () => {
    const randomIndex = Math.floor(Math.random() * levels.length);
    return levels[randomIndex];
};

const MemoryGame1vs1Controller = async (req: Request, res: Response) => {
    try {
        const englishLevel = getRandomEnglishLevel();
        
        const data = await getMemoryGameItems1vs1(englishLevel);

        if (!data) {
            res.status(404).send("No data found");
            return;
        }

        const dataFormated = data.map((result) => ({
            src: result.imgSrc,
            matched: false,
            question: result.question,
            correctAnswer: result.correctAnswer,
            incorrectAnswers: [
                result.incorrectAnswer1,
                result.incorrectAnswer2,
                result.incorrectAnswer3,
            ],
        }));

        
        res.send(dataFormated);
    } catch (error) {
        handlerHttp(res, "Error_GET_BLOG");
    }
};

export { MemoryGame1vs1Controller };
