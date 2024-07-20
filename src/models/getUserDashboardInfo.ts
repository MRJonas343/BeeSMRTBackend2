import { RowDataPacket } from "mysql2"
import { pool } from "../config/connectionMySQL"

interface UserStats extends RowDataPacket {
	TotalTrophys: number
	GamesPlayed: number
}

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

	try {
		const [userStatsResult, positionListResult] = await Promise.all([
			pool.query<UserStats[]>(
				"SELECT SUM(Trophys) AS TotalTrophys, COUNT(*) AS GamesPlayed FROM userTrophys WHERE emailUser = ?;",
				[emailUser],
			),
			pool.query<RowDataPacket[]>(
				"SELECT emailUser, SUM(Trophys) AS TotalTrophys FROM userTrophys GROUP BY emailUser ORDER BY TotalTrophys DESC LIMIT 50;",
			),
		])

		const userStats = userStatsResult[0][0]
		const positionList = positionListResult[0]

		let userPosition = "Unclassified"
		positionList.forEach((element, index) => {
			if (element.emailUser === emailUser) {
				userPosition = String(index + 1)
			}
		})

		const userAchievements = possibleAchievements.filter((_, index) => {
			const thresholds = [1, 3, 5, 10, 25, 50, 100, 250, 500, 1000]
			return userStats.GamesPlayed >= thresholds[index]
		})

		return { ...userStats, userPosition, userAchievements }
	} catch (error) {
		console.error("Error fetching user dashboard info:", error)
		return null
	}
}

export { getUserDashboardInfo }
