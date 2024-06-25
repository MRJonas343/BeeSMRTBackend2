import { Request, Response } from "express"
import { getUserTotalTrophies } from "../models/getUserTrophies"

const userDashboardController = async (req: Request, res: Response) => {
	try {
		const email = String(req.headers.email)

		if (!email) return res.status(400).send("Email is required")
		//*Ask the backend for the data
		const trophies = await getUserTotalTrophies(email)
		res.status(200).send(trophies)
	} catch (error) {
		res.status(500).send("Error")
	}
}

export { userDashboardController }
