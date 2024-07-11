import { pool } from "../config/connectionMySQL"
import { ResultSetHeader } from "mysql2"
import { ContactMessage } from "../interfaces/contactMessage"

const saveContactMessage = async (contactMessage: ContactMessage) => {
	try {
		const [result, fields] = await pool.query<ResultSetHeader>(
			"INSERT INTO MessagesForm (nameUser, email, message) VALUES (?, ?, ?)",
			[contactMessage.nameUser, contactMessage.email, contactMessage.message],
		)

		if (result.affectedRows === 0) {
			return "Error"
		}

		return "Success"
	} catch (error) {
		console.log(error)
	}
}

export { saveContactMessage }
