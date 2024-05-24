import { Request, Response } from "express"
import { registerUser, loginUser } from "../models/auth"
import { handlerHttp } from "../utils/errorHandler"

const registerController = async (req: Request, res: Response) => {
	try {
		const {
			fullName,
			nickName,
			email,
			password,
			profileImg,
			englishLevel,
			beeLevel,
		} = req.body
		const responseUser = await registerUser({
			fullName,
			nickName,
			email,
			password,
			profileImg,
			englishLevel,
			beeLevel,
		})
		res.json(responseUser)
	} catch (error) {
		handlerHttp(res, "Error_REGISTER_USER")
		console.log(error)
	}
}

const loginController = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		const responseUser = await loginUser({ email, password })

		if (responseUser === "The user does not exist") {
			res.status(404)
			res.json("The user does not exist")
		}

		if (responseUser === "Wrong password") {
			res.status(401)
			res.json("Wrong password")
		}

		if (responseUser) {
			res.status(200)
			res.json(responseUser)
		}
	} catch (error) {
		handlerHttp(res, "Error_LOGIN_USER")
		console.log(error)
	}
}

export { registerController, loginController }
