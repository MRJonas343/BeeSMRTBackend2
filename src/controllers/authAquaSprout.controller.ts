import { Request, Response } from "express"
import {
	loginUserAquaSprout,
	registerUserModelAquaSprout,
} from "../models/modelAquaSprout"
import { handlerHttp } from "../utils/errorHandler"

const registerControllerAquaSprout = async (req: Request, res: Response) => {
	try {
		const { plant, userName, email, password } = req.body
		const responseUser = await registerUserModelAquaSprout({
			plant,
			userName,
			email,
			password,
		})

		if (responseUser === "UserAlreadyExists") {
			res.status(409)
			res.json("UserAlreadyExists")
			return
		}

		if (responseUser === "SuccessCreatingUser") {
			res.status(200)
			res.json("SuccessCreatingUser")
			return
		}

		res.json(responseUser)
	} catch (error) {
		handlerHttp(res, "Error_REGISTER_USER")
		console.log(error)
	}
}

const loginControllerAquaSprout = async (req: Request, res: Response) => {
	try {
		const email = String(req.headers.email)
		const password = String(req.headers.password)
		const responseUser = await loginUserAquaSprout({ email, password })

		if (responseUser === "The user does not exist") {
			res.status(404)
			res.json("The user does not exist")
			return
		}

		if (responseUser === "Wrong password") {
			res.status(401)
			res.json("Wrong password")
			return
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

export { registerControllerAquaSprout, loginControllerAquaSprout }
