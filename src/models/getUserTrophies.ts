import { RowDataPacket } from "mysql2"
import { pool } from "../config/connectionMySQL"

const getUserTotalTrophies = async (emailUser: string) => {
	try {
		const [result] = await pool.query<RowDataPacket[]>(
			"SELECT SUM(Trophys) as TotalTrophies FROM userTrophys where emailUser= ?;",
			[emailUser],
		)

		return result
	} catch (error) {
		console.log(error)
		throw error
	}
}

export { getUserTotalTrophies }
