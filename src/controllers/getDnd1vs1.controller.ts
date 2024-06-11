import { Request, Response } from "express"
import { handlerHttp } from "../utils/errorHandler"
import { getDndItemsSingleMode } from "../models/GetDndItems1vs1.model"

//Toda los metodos posibles para usar en la ruta /item

const getDndItemsSingleModeController = async (req: Request, res: Response) => {
	try {
		const items = await getDndItemsSingleMode()
		res.send(items)
	} catch (error) {
		handlerHttp(res, "Error_GET_ITEM")
	}
}

export { getDndItemsSingleModeController }
