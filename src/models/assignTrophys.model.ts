import { pool } from "../config/connectionMySQL"
import { RowDataPacket } from "mysql2"
//*Row data packet allows you to use the array methods

const assignUserTrophys = async (
	trophys: number,
	email: string,
	game: string,
	level: string,
) => {
	try {
		const [result] = await pool.query<RowDataPacket[]>(
			"SELECT * from userTrophys where emailUser= ? and Game = ? and Level = ?;",
			[email, game, level],
		)

		if (result.length > 0) return "levelCompleted"

		await pool.query<RowDataPacket[]>(
			"INSERT INTO userTrophys (Level, Game, Trophys, emailUser) values (? , ?, ? , ?);",
			[level, game, trophys, email],
		)

		return "trophysAssigned"
	} catch (error) {
		console.log(error)
	}
}

export { assignUserTrophys }
