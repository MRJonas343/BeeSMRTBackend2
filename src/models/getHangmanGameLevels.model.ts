import { pool } from "../config/connectionMySQL"
import { RowDataPacket } from "mysql2"

// Define the interface for the Level
interface Level extends RowDataPacket {
	id: number
	EnglishLevel: string
	LevelName: string
	Game: string
	Level: string
}

const getHangmanGameLevelsModels = async (game: string, englishLevel: string): Promise<Level[]> => {
	try {
		const [result] = await pool.query<Level[]>(
			"SELECT * FROM Levels WHERE Game = ? AND EnglishLevel = ?",
			[game, englishLevel],
		)
		return result
	} catch (error) {
		console.error(error)
		throw new Error("Database error")
	}
}

export { getHangmanGameLevelsModels }
