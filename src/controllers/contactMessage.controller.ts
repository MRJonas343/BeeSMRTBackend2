import { Request, Response } from "express"
import { saveContactMessage } from "../models/savecontactMessage"

const contactMessageController = async (req: Request, res: Response) => {
	const contactMessage = req.body
	const result = await saveContactMessage(contactMessage)

	if (result === "Error") {
		res.status(500).json({ message: "Error" })
	}

	res.status(200).json({ message: "Success" })
}

export { contactMessageController }
