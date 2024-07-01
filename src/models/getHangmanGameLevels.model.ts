import { pool } from "../config/connectionMySQL"
import { RowDataPacket } from "mysql2"


interface Level extends RowDataPacket {
	id: number
	EnglishLevel: string
	LevelName: string
	levels: string
}

const getHangmanGameLevelsModels = async (game: string): Promise<Level[]> => {
	try {
		const [result] = await pool.query<Level[]>(
			"SELECT EnglishLevel, LevelName, levels FROM Levels WHERE Game = ?;",
			[game],
		)
		return result
	} catch (error) {
		console.error(error)
		throw new Error("Database error")
	}
}

export { getHangmanGameLevelsModels }
