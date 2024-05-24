import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/jwt.handle"

const checkJWT = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const jwtbyUser = req.headers.authorization || ""
		const jwt = jwtbyUser.split(" ")[1]
		const isTokenValid = await verifyToken(String(jwt))

		if (!isTokenValid) {
			res.status(401)
			res.send("Token is not valid")
		} else {
			console.log("Token is valid")
			next()
		}
	} catch (e) {
		res.status(401)
		res.send("Unauthorized")
	}
}

export { checkJWT }
