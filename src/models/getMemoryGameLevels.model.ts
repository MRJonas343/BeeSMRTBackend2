import { pool } from "../config/connectionMySQL"
import { RowDataPacket } from "mysql2"

const getMemoryGameLevelsModels = async (Game: string) => {
	try {
		const [result, fields] = await pool.query<RowDataPacket[]>(
			"SELECT EnglishLevel, LevelName, levels from Levels where Game = ?;",
			[Game],
		)

		return result
	} catch (error) {
		console.log(error)
	}
}

export { getMemoryGameLevelsModels }
