import { Request, Response } from "express"
import { handlerHttp } from "../utils/errorHandler"
import { getMemoryGameLevelsModels } from "../models/getMemoryGameLevels.model"
import { getUserTrophys } from "../models/getUserTrophys.model"

const getMemoryGameLevelsController = async (req: Request, res: Response) => {
	try {
		const Game = String(req.headers.game)
		const userEmail = String(req.headers.email)

		if (!Game) {
			res.status(400).send("Missing required headers")
			return
		}

		const [memoryGameLevels, userTrophys] = await Promise.all([
			getMemoryGameLevelsModels(Game),
			getUserTrophys(userEmail, Game),
		])

		if (!memoryGameLevels) {
			res.status(404).send("No levels found")
			return
		}

		const data = memoryGameLevels.map((level) => {
			const { EnglishLevel, LevelName, levels: Level } = level

			//*Check if the user has already played the level
			const userTrophy = userTrophys.find((trophy) => trophy.Level === Level)

			//* If the user hasn't played the level, the Trophys will be 0
			const Trophys = userTrophy ? userTrophy.Trophys : 0

			return { EnglishLevel, LevelName, Level, Trophys }
		})

		res.status(200).send(data)
	} catch (error) {
		console.error(error)
		handlerHttp(res, "Error_GET_MEMORY_GAME_LEVELS")
	}
}

export { getMemoryGameLevelsController }
