import { createUser } from "../interfaces/aurth.interface"
import { Auth } from "../interfaces/aurth.interface"
import { pool } from "../config/connectionMySQL"
import { RowDataPacket, ResultSetHeader } from "mysql2"
import { encrypt, verified } from "../utils/bcrypt.handle"
import { generateToken } from "../utils/jwt.handle"

const registerUser = async (authUser: createUser) => {
	try {
		//*Check if the user already exists
		const [result, fields] = await pool.query<RowDataPacket[]>(
			"SELECT email from normalUserInfo where email = ?",
			[authUser.email],
		)
		if (result.length > 0) {
			return "El usuario ya existe"
		}

		//*Create the user
		const hashPassword = await encrypt(authUser.password)

		const [result2, fields2] = await pool.query<ResultSetHeader>(
			"INSERT INTO normalUserInfo (fullName, nickName, email, password) VALUES (?, ?, ?, ?)",
			[authUser.fullName, authUser.nickName, authUser.email, hashPassword],
		)

		//*Check if the user was created
		if (result2.affectedRows === 0) {
			return "Error al crear usuario"
		}
		return "Usuario creado correctamente"
	} catch (error) {
		console.log(error)
	}
}

const loginUser = async ({ email, password }: Auth) => {
	try {
		const [result, fields] = await pool.query<RowDataPacket[]>(
			"SELECT * from normalUserInfo where email = ?",
			[email],
		)
		if (result.length === 0) {
			return "The user does not exist"
		}

		const isAuthorized = await verified(password, result[0].password)

		if (!isAuthorized) {
			return "Wrong password"
		}

		const token = await generateToken(String(result[0].id))

		if (isAuthorized) {
			const data = {
				fullName: result[0].fullName,
				nickName: result[0].nickName,
				email: result[0].email,
				token,
			}
			return data
		}
	} catch (error) {
		console.log(error)
	}
}

export { registerUser, loginUser }
