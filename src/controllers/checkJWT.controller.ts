import { verify, TokenExpiredError } from "jsonwebtoken"
import { Request, Response } from "express"
import "dotenv/config"

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
	throw new Error("JWT_SECRET is not defined in the environment variables")
}

const verifyTokenController = async (req: Request, res: Response) => {
	const token = req.headers.authorization

	if (!token) {
		res.status(400).json({ message: "TokenNotProvided" })
		return
	}

	const jwt = token.split(" ")[1]

	try {
		const isOk = verify(jwt, JWT_SECRET)
		if (isOk) {
			res.status(200).json({ message: "ValidToken" })
			return
		}
	} catch (e) {
		if (e instanceof TokenExpiredError) {
			res.status(498).json({ message: "TokenExpired" })
			return
		}
		res.status(401).json({ message: "InvalidToken" })
		return
	}
}

export { verifyTokenController }
