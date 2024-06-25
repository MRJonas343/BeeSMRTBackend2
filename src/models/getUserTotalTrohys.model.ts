import { RowDataPacket } from "mysql2"
import { pool } from "../config/connectionMySQL"

const getUserTrophys = async (emailUser: string, Game: string) => {
	try {
		const [result] = await pool.query<RowDataPacket[]>(
			"SELECT Level, Trophys FROM userTrophys WHERE emailUser = ? AND Game = ?;",
			[emailUser, Game],
		)

		return result
	} catch (error) {
		console.log(error)
		throw error
	}
}

export { getUserTrophys }
