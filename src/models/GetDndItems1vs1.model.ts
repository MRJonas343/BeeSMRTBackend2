import { pool } from "../config/connectionMySQL"
import { RowDataPacket } from "mysql2"
//*Row data packet allows you to use the array methods

const getDndItemsSingleMode = async () => {
	try {
		const [result, fields] = await pool.query<RowDataPacket[]>(
			"SELECT * FROM DndGameItems",
		)
		return result
	} catch (error) {
		console.log(error)
	}
}

export { getDndItemsSingleMode }
