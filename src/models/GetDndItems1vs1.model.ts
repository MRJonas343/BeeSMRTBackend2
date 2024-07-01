import { pool } from "../config/connectionMySQL"
import { RowDataPacket } from "mysql2"

const getDndItems = async (englishLevel: string) => {
	try {
		const [result] = await pool.query<RowDataPacket[]>(
			"SELECT id, word, image FROM DragAndDropGame WHERE EnglishLevel = ?;",
			[englishLevel],
		)
		return result
	} catch (error) {
		console.log(error)
		throw error
	}
}

export { getDndItems }
