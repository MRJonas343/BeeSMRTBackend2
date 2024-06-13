import { Request, Response } from "express"
import { handlerHttp } from "../utils/errorHandler"
import { getHangmanGameLevelsModels } from "../models/getHangmanGameLevels.model"
import { getUserTrophys } from "../models/getUserTrophys.model"

const getHangmanLevelsController = async (req: Request, res: Response): Promise<void> => {
	try {
		const Game = String(req.headers.game)
		const userEmail = String(req.headers.email)
		const englishLevel = String(req.headers.englishlevel)

		if (!Game || !userEmail || !englishLevel) {
			res.status(400).send("Missing required headers")
			return
		}

		const [hangmanGameLevels, userTrophys] = await Promise.all([
			getHangmanGameLevelsModels(Game, englishLevel),
			getUserTrophys(userEmail, Game),
		])

		if (!hangmanGameLevels || hangmanGameLevels.length === 0) {
			res.status(404).send("No levels found")
			return
		}

		const data = hangmanGameLevels.map((level) => {
			const { EnglishLevel, LevelName, Level } = level

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



    