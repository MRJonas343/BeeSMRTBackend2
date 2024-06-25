import { Request, Response } from "express"
import { handlerHttp } from "../utils/errorHandler"
import { getHangmanGameLevelsModels } from "../models/getHangmanGameLevels.model"
import { getUserTrophys } from "../models/getUserTotalTrohys.model"

const getHangmanLevelsController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const Game = "HangmanGame"
		const userEmail = String(req.headers.email)

		const [hangmanGameLevels, userTrophys] = await Promise.all([
			getHangmanGameLevelsModels(Game),
			getUserTrophys(userEmail, Game),
		])

		if (!hangmanGameLevels) {
			res.status(404).send("No levels found")
			return
		}

		const data = hangmanGameLevels.map((level) => {
			const { EnglishLevel, LevelName, levels: Level } = level

			const userTrophy = userTrophys.find((trophy) => trophy.Level === Level)

			const Trophys = userTrophy ? userTrophy.Trophys : 0

			return { EnglishLevel, LevelName, Level, Trophys }
		})

		res.status(200).send(data)
	} catch (error) {
		console.error(error)
		handlerHttp(res, "Error_GET_HANGMAN_LEVELS")
	}
}

export { getHangmanLevelsController }
