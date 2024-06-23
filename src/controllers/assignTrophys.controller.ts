import { Request, Response } from "express"
import { handlerHttp } from "../utils/errorHandler"
import { assignUserTrophys } from "../models/assignTrophys.model"

const assignTrophysController = async (req: Request, res: Response) => {
	try {
		const { email, game, level } = req.body
		console.log(req.body)

		const availableTrophys: { [key: string]: number } = {
			A1Level1: 10,
			A1Level2: 20,
			A1Level3: 30,
			A1Level4: 40,
			A1Level5: 50,
			A1Level6: 60,
			B1Level1: 110,
			B1Level2: 120,
			B1Level3: 130,
			B1Level4: 140,
			B1Level5: 150,
			B1Level6: 160,
			C1Level1: 210,
			C1Level2: 220,
			C1Level3: 230,
			C1Level4: 240,
			C1Level5: 250,
			C1Level6: 260,
		}

		const trophys = availableTrophys[level]

		const response = await assignUserTrophys(trophys, email, game, level)

		res.status(200).json({ message: response })
	} catch (error) {
		console.error(error)
		handlerHttp(res, "ERROR_GET_LEVELS")
	}
}

export { assignTrophysController }
