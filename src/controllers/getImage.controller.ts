import { Request, Response } from "express"
import { getImage } from "../utils/getImage"

const getImageController = async (req: Request, res: Response) => {
	const image = String(req.headers.image)
	const url = await getImage(image)

	if (url === "Error") {
		res.status(500).send("Error")
		return
	}

	res.status(200).send(url)
}

export { getImageController }
