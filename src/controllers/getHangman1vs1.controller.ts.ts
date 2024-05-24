import { Request, Response } from "express"
import { handlerHttp } from "../utils/errorHandler"
import { getHangmanItems1vs1 } from "../models/GetHangmanGame1vs1.model"

const getHangman1vs1Controller = async (req: Request, res: Response) => {
	try {
		const data = await getHangmanItems1vs1()
		res.send(data)
	} catch (error) {
		handlerHttp(res, "Error_GET_BLOG")
	}
}

export { getHangman1vs1Controller }
