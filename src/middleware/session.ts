import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/jwt.handle"

const checkJWT = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const jwtbyUser = req.headers.authorization

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

		if (!isTokenValid) {
			res.status(401)
			res.send({ message: "Unauthorized" })
			return
		}

		if (isTokenValid === "expired") {
			res.status(498)
			res.send({ message: "Token expired" })
			return
		}

		next()
	} catch (e) {
		res.status(401)
		res.send("Unauthorized")
	}
}

export { checkJWT }
