import { Request, Response } from "express"
import { handlerHttp } from "../utils/errorHandler"
import { getMemoryGameItems1vs1 } from "../models/GetMemoryGameItems1vs1.model"

const MemoryGame1vs1Controller = async (req: Request, res: Response) => {
	try {
		const englishLevel = String(req.headers.englishlevel)
		console.log(englishLevel)
		const data = await getMemoryGameItems1vs1(englishLevel)
		res.send(data)
	} catch (error) {
		handlerHttp(res, "Error_GET_BLOG")
	}
}

export { MemoryGame1vs1Controller }
