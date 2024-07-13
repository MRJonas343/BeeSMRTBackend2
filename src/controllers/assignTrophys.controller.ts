import { Request, Response } from "express"
import { handlerHttp } from "../utils/errorHandler"
import { assignUserTrophys } from "../models/assignTrophys.model"

const assignTrophysController = async (req: Request, res: Response) => {
	try {
		const { email, game, level } = req.body

		const availableTrophys: { [key: string]: number } = {
			A1Level1: 10,
			A1Level2: 20,
			A1Level3: 30,
			A1Level4: 40,
			A1Level5: 50,
			A1Level6: 60,
			A2Level1: 70,
			A2Level2: 80,
			A2Level3: 90,
			A2Level4: 100,
			A2Level5: 110,
			A2Level6: 120,
			B1Level1: 130,
			B1Level2: 140,
			B1Level3: 150,
			B1Level4: 160,
			B1Level5: 170,
			B1Level6: 180,
			B2Level1: 190,
			B2Level2: 200,
			B2Level3: 210,
			B2Level4: 220,
			B2Level5: 230,
			B2Level6: 240,
			C1Level1: 250,
			C1Level2: 260,
			C1Level3: 270,
			C1Level4: 280,
			C1Level5: 290,
			C1Level6: 300,
			C2Level1: 310,
			C2Level2: 320,
			C2Level3: 330,
			C2Level4: 340,
			C2Level5: 350,
			C2Level6: 360,
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
