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

// const createItem = (req: Request, res: Response) => {
// 	try {
// 		res.send(req.body)

// 		console.log(req.body)
// 	} catch (error) {
// 		handlerHttp(res, "Error_CREATE_ITEM")
// 		console.log(error)
// 	}
// }

// const updateItem = (req: Request, res: Response) => {
// 	try {
// 		res.send("UPDATE_ITEM")
// 	} catch (error) {
// 		handlerHttp(res, "Error_UPDATE_ITEM")
// 	}
// }

// const deleteItem = (req: Request, res: Response) => {
// 	try {
// 		res.send("DELETE_ITEM")
// 	} catch (error) {
// 		handlerHttp(res, "Error_DELETE_ITEM")
// 	}
// }

export { getDndItemsSingleModeController }
