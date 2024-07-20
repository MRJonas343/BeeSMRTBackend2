import { RowDataPacket } from "mysql2"
import { pool } from "../config/connectionMySQL"

const getUserDashboardInfo = async (emailUser: string) => {
	try {
		const [result] = await pool.query<RowDataPacket[]>(
			"SELECT SUM(Trophys) AS TotalTrophys, COUNT(*) AS GamesPlayed FROM userTrophys WHERE emailUser = ?;",
			[emailUser],
		)

		//*get the position of the user
		const [position] = await pool.query<RowDataPacket[]>(
			"SELECT emailUser, SUM(Trophys) AS TotalTrophys FROM userTrophys GROUP BY emailUser ORDER BY TotalTrophys DESC LIMIT 50;",
		)

		let userPosition = 0
		position.forEach((element, index) => {
			if (element.emailUser === emailUser) {
				userPosition = index + 1
			}
		})

		return { ...result[0], userPosition }
	} catch (error) {
		console.log(error)
		throw error
	}
}

export { getUserDashboardInfo }
