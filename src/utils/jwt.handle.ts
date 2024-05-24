import { sign, verify } from "jsonwebtoken"
import "dotenv/config"

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
	throw new Error("JWT_SECRET is not defined in the environment variables")
}

const generateToken = async (id: string) => {
	const jwt = sign({ id }, JWT_SECRET, {
		expiresIn: "10d",
	})
	return jwt
}

const verifyToken = async (token: string) => {
	try {
		const isOk = verify(token, JWT_SECRET)
		return isOk
	} catch (e) {
		console.log("Error verifying token")
	}
}

export { generateToken, verifyToken }
