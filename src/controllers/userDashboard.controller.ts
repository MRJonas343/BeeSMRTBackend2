import { Request, Response } from "express"
import { getUserDashboardInfo } from "../models/getUserDashboardInfo"

const userDashboardController = async (req: Request, res: Response) => {
	try {
		const email = String(req.headers.email)

		if (!email) return res.status(400).send("Email is required")
		//*Ask the backend for the data
		const data = await getUserDashboardInfo(email)

		if (!data) return res.status(404).send("User not found")

		res.status(200).send(data)
	} catch (error) {
		res.status(500).send("Error")
	}
}

export { userDashboardController }
