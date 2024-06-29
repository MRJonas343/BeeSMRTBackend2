import { Request, Response, NextFunction } from "express"
import { z } from "zod"

const validateUserDataToUpdate = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	let dataToUpdateSchema = z.object({
		email: z.string().email().min(5),
	})

	try {
		if (req.body.fullName) {
			dataToUpdateSchema = dataToUpdateSchema.extend({
				fullName: z.string().min(5).max(50),
			})
		}

		if (req.body.nickName) {
			dataToUpdateSchema = dataToUpdateSchema.extend({
				nickName: z.string().min(5).max(50),
			})
		}

		if (req.body.englishLevel) {
			dataToUpdateSchema = dataToUpdateSchema.extend({
				englishLevel: z
					.string()
					.min(2)
					.max(2)
					.regex(/(A1|A2|B1|B2|C1|C2)/),
			})
		}

		dataToUpdateSchema.parse({
			email: req.headers.email,
			...(req.body.fullName && { fullName: req.body.fullName }),
			...(req.body.nickName && { nickName: req.body.nickName }),
			...(req.body.englishLevel && { englishLevel: req.body.englishLevel }),
		})

		next()
	} catch (error) {
		res.status(406)
		res.json(error)
	}
}

export { validateUserDataToUpdate }
