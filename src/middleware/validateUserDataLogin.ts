import { Request, Response, NextFunction } from "express"
import { z } from "zod"

const createUserSchema = z.object({
	email: z.string().email().min(5),
	password: z.string().min(8).max(20),
})

const validateUserDataLogin = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		createUserSchema.parse(req.body)
		next()
	} catch (error) {
		res.status(406)
		res.json(error)
	}
}

export { validateUserDataLogin }
