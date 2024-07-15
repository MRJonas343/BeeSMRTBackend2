import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/jwt.handle"

const checkUserLogin = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const jwtbyUser = req.headers.authorization
		const userEmail = req.headers.email

		if (!userEmail) {
			next()
			return
		}

		if (!jwtbyUser) {
			res.status(401)
			res.send({ message: "Unauthorized" })
			return
		}

		const jwt = jwtbyUser.split(" ")[1]

		if (!jwt) {
			res.status(401)
			res.send({ message: "Unauthorized" })
			return
		}

		const isTokenValid = await verifyToken(String(jwt))

		if (isTokenValid === "expired") {
			res.status(498).send({ message: "Token expired" })
			return
		}

		if (!isTokenValid) {
			res.status(401)
			res.send({ message: "Unauthorized" })
			return
		}

		next()
	} catch (e) {
		res.status(401)
		res.send({ message: "Unauthorized" })
	}
}

export { checkUserLogin }
