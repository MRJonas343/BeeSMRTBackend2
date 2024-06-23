import { Request, Response, NextFunction } from "express"
import { z } from "zod"

const createUserSchema = z.object({
	email: z.string().email().min(5),
	game: z.string().min(8).max(25),
	level: z.string().min(1).max(10),
})

const validateDataAssignTrophys = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		console.log(req.body)
		createUserSchema.parse(req.body)
		next()
	} catch (error) {
		res.status(406)
		res.json(error)
	}
}

export { validateDataAssignTrophys }
