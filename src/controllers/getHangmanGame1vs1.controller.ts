import { Request, Response } from "express"
import { handlerHttp } from "../utils/errorHandler"
import { getHangmanItems1vs1 } from "../models/GetHangmanGame1vs1.model"

// Lista de niveles
const levels = [
	"A1Level1",
	"A1Level2",
	"A1Level3",
	"A1Level4",
	"A1Level5",
	"A1Level6",
	"B1Level1",
	"B1Level2",
	"B1Level3",
	"B1Level4",
	"B1Level5",
	"B1Level6",
	"C1Level1",
	"C1Level2",
	"C1Level3",
	"C1Level4",
	"C1Level5",
	"C1Level6",
]

// Función para obtener un nivel aleatorio
const getRandomLevel = () => {
	const randomIndex = Math.floor(Math.random() * levels.length)
	return levels[randomIndex]
}

const HangmanGame1vs1Controller = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const englishLevel = getRandomLevel() // Seleccionar un nivel aleatorio

		const levelsData = await getHangmanItems1vs1(englishLevel)

		if (!levelsData || levelsData.length === 0) {
			res.status(404).send("No levels found for the specified EnglishLevel")
			return
		}

		res.status(200).json(levelsData)
	} catch (error) {
		console.error(error)
		handlerHttp(res, "Error_GET_HANGMAN_LEVELS")
	}
}

export { HangmanGame1vs1Controller }
