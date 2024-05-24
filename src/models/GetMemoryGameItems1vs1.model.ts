import { pool } from "../config/connectionMySQL"
import { RowDataPacket } from "mysql2"
//*Row data packet allows you to use the array methods

const getMemoryGameItems1vs1 = async (englishLevel: string) => {
	//*Este sera el dato que reciba del front

	try {
		const [result, fields] = await pool.query<RowDataPacket[]>(
			"SELECT * FROM MemoryGameLevels where EnglishLevel = ?",
			[englishLevel],
		)
		return result
	} catch (error) {
		console.log(error)
	}
}

export { getMemoryGameItems1vs1 }
