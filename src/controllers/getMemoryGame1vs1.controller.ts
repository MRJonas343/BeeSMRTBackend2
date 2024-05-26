import { Request, Response } from "express"
import { handlerHttp } from "../utils/errorHandler"
import { getMemoryGameItems1vs1 } from "../models/GetMemoryGameItems1vs1.model"

const MemoryGame1vs1Controller = async (req: Request, res: Response) => {
	try {
		const englishLevel = String(req.headers.englishlevel)
		console.log(englishLevel)
		const data = await getMemoryGameItems1vs1(englishLevel)

		if (!data) {
			res.send("No data found")
			res.status(404)
			return
		}

		//*Mapiar los resultados
		const dataFormated = data.map((result) => {
			return {
				src: result.imgSrc,
				matched: false,
				question: result.question,
				correctAnswer: result.correctAnswer,
				incorrectAnswers: [
					result.incorrectAnswer1,
					result.incorrectAnswer2,
					result.incorrectAnswer3,
				],
			}
		})
		res.send(dataFormated)
	} catch (error) {
		handlerHttp(res, "Error_GET_BLOG")
	}
}

export { MemoryGame1vs1Controller }
