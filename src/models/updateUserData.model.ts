import { pool } from "../config/connectionMySQL"
import { RowDataPacket } from "mysql2"

const updateUserData = async (
	email: string,
	// biome-ignore lint/suspicious/noExplicitAny: <We dont know the shape of the object, so we use any>
	dataToUpdate: Record<string, any>,
) => {
	try {
		const [result] = await pool.query<RowDataPacket[]>(
			"UPDATE normalUserInfo SET ? WHERE email = ?",
			[dataToUpdate, email],
		)

		return "Successfull"
	} catch (error) {
		console.log(error)
	}
}

export { updateUserData }
