import { Request, Response, NextFunction } from "express"
import { z } from "zod"

const createUserSchema = z.object({
	fullName: z.string().min(5).max(50),
	nickName: z.string().min(5).max(50),
	email: z.string().email().min(5),
	password: z.string().min(8).max(20),
})

const validateUserData = async (
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

export { validateUserData }
