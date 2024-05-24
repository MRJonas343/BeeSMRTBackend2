import { pool } from "../config/connectionMySQL"
import { RowDataPacket } from "mysql2"
//*Row data packet allows you to use the array methods

const getHangmanItems1vs1 = async () => {
	try {
		const [result, fields] = await pool.query<RowDataPacket[]>(
			"SELECT * FROM HangmanWords",
		)
		return result
	} catch (error) {
		console.log(error)
	}
}

export { getHangmanItems1vs1 }
