import { Request, Response } from "express"
import { handlerHttp } from "../utils/errorHandler"
import { getMemoryGameLevelsModels } from "../models/getMemoryGameLevels.model"
import { getUserTrophys } from "../models/getUserTotalTrohys.model"

type LevelsProgress = {
	EnglishLevel: string
	LevelName: string
	Level: string
	Trophys: number
}

const getLevelsAndTrophysController = async (req: Request, res: Response) => {
	try {
		const EnglishLevel = String(req.headers.Englishlevel)
		const Game = String(req.headers.Game)
		const Level = String(req.headers.Level)

		if (!EnglishLevel || !Game || !Level) {
			res.status(400).send("Missing required headers")
			return
		}

		const levels = await getMemoryGameLevelsModels(Game)
		const email = String(req.headers.email)
		const game = String(req.headers.game)

		if (!email || !game) {
			res.status(400).send("Missing required headers")
			return
		}

		const userTrophys = await getUserTrophys(email, game)

		if (!levels || !userTrophys) {
			res.status(404).send("No levels or trophies found")
			return
		}

		const data: LevelsProgress[] = []

		for (let i = 0; i < levels.length; i++) {
			const EnglishLevel = levels[i].EnglishLevel
			const LevelName = levels[i].LevelName
			const Level = levels[i].Level
			let Trophys = 0

			for (let j = 0; j < userTrophys.length; j++) {
				if (userTrophys[j].Level === Level) {
					Trophys = userTrophys[j].Trophys
					break
				}

				if (j === userTrophys.length - 1) {
					Trophys = 0
				}
			}

			data.push({
				EnglishLevel,
				LevelName,
				Level,
				Trophys,
			})
		}

		res.json(data)
		res.status(200)
	} catch (error) {
		console.error(error)
		handlerHttp(res, "Error_GET_LEVELS_AND_TROPHYS")
	}
}

export { getLevelsAndTrophysController }
