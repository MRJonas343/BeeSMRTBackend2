import { Request, Response } from "express"
import { handlerHttp } from "../utils/errorHandler"

//Toda los metodos posibles para usar en la ruta /item

const getProtectedResourcesController = async (req: Request, res: Response) => {
	try {
		res.status(200)
		res.send("Protected resources")
	} catch (error) {
		handlerHttp(res, "Error_GET_ITEM")
	}
}

export { getProtectedResourcesController }
