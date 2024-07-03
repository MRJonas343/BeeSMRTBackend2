import { createUserAquaSprout } from "../interfaces/aurth.interface"
import { Auth } from "../interfaces/aurth.interface"
import { pool } from "../config/connectionMySQL"
import { RowDataPacket, ResultSetHeader } from "mysql2"
import { encrypt, verified } from "../utils/bcrypt.handle"

const registerUserModelAquaSprout = async (authUser: createUserAquaSprout) => {
	try {
		//*Check if the user already exists
		const [result, fields] = await pool.query<RowDataPacket[]>(
			"SELECT * from usersAquaSprout where email = ?",
			[authUser.email],
		)
		if (result.length > 0) {
			return "UserAlreadyExists"
		}

		//*Create the user
		const hashPassword = await encrypt(authUser.password)

		const [result2] = await pool.query<RowDataPacket[]>(
			"INSERT INTO usersAquaSprout(plant,userName,email,password) values (?, ?, ?, ?);",
			[authUser.plant, authUser.userName, authUser.email, hashPassword],
		)

		return "SuccessCreatingUser"
	} catch (error) {
		console.log(error)
	}
}

const loginUserAquaSprout = async ({ email, password }: Auth) => {
	try {
		const [result] = await pool.query<RowDataPacket[]>(
			"SELECT * from usersAquaSprout where email = ?",
			[email],
		)
		if (result.length === 0) {
			return "The user does not exist"
		}

		const isAuthorized = await verified(password, result[0].password)

		if (!isAuthorized) {
			return "Wrong password"
		}

		const [lecturasResult, wateringInfoResult] = await Promise.all([
			pool.query<RowDataPacket[]>(
				"SELECT * FROM lecturasAquaSprout ORDER BY id DESC LIMIT 10;",
			),
			pool.query<RowDataPacket[]>(
				"SELECT COUNT(*) AS totalTimesWatered, MAX(waterTime) AS lastTimeWatered FROM waters;",
			),
		])

		const lecturasArray = (lecturasResult[0] as RowDataPacket[]).map(
			(lectura) => lectura.valor,
		)

		const data = {
			plant: result[0].plant,
			userName: result[0].userName,
			email: result[0].email,
			lecturas: lecturasArray,
			wateringInfo: wateringInfoResult[0][0].totalTimesWatered,
			lastTimeWatered: wateringInfoResult[0][0].lastTimeWatered,
		}

		return data
	} catch (error) {
		console.log(error)
	}
}

export { registerUserModelAquaSprout, loginUserAquaSprout }
