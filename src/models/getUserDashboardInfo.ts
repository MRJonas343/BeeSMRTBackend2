import { RowDataPacket } from "mysql2"
import { pool } from "../config/connectionMySQL"

const getUserDashboardInfo = async (emailUser: string) => {
	const possibleAchievements = [
		"FirstGame",
		"Lollipop",
		"Bronze",
		"Silver",
		"Gold",
		"Platinum",
		"Diamond",
		"Master",
		"GrandMaster",
		"Challenger",
	]
	const userAchivements = []
	try {
		const [result] = await pool.query<RowDataPacket[]>(
			"SELECT SUM(Trophys) AS TotalTrophys, COUNT(*) AS GamesPlayed FROM userTrophys WHERE emailUser = ?;",
			[emailUser],
		)

		//*get the position of the user
		const [position] = await pool.query<RowDataPacket[]>(
			"SELECT emailUser, SUM(Trophys) AS TotalTrophys FROM userTrophys GROUP BY emailUser ORDER BY TotalTrophys DESC LIMIT 50;",
		)

		let userPosition = "Unclassified"
		position.forEach((element, index) => {
			if (element.emailUser === emailUser) {
				userPosition = String(index + 1)
			}
		})

		if (result[0].GamesPlayed >= 1000) {
			userAchivements.push(possibleAchievements[9])
		}
		if (result[0].GamesPlayed >= 500) {
			userAchivements.push(possibleAchievements[8])
		}
		if (result[0].GamesPlayed >= 250) {
			userAchivements.push(possibleAchievements[7])
		}
		if (result[0].GamesPlayed >= 100) {
			userAchivements.push(possibleAchievements[6])
		}
		if (result[0].GamesPlayed >= 50) {
			userAchivements.push(possibleAchievements[5])
		}
		if (result[0].GamesPlayed >= 25) {
			userAchivements.push(possibleAchievements[4])
		}
		if (result[0].GamesPlayed >= 10) {
			userAchivements.push(possibleAchievements[3])
		}
		if (result[0].GamesPlayed >= 5) {
			userAchivements.push(possibleAchievements[2])
		}
		if (result[0].GamesPlayed >= 3) {
			userAchivements.push(possibleAchievements[1])
		}
		if (result[0].GamesPlayed >= 1) {
			userAchivements.push(possibleAchievements[0])
		}

		return { ...result[0], userPosition, userAchivements }
	} catch (error) {
		console.log(error)
		throw error
	}
}

export { getUserDashboardInfo }
