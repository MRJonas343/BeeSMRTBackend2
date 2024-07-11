import { Request, Response } from "express"
import { pool } from "../config/connectionMySQL"

export const getLeaderBoard = async (req: Request, res: Response) => {
	try {
		const [rows] = await pool.query(`
            SELECT 
                u.nickName,
                u.profileImg,
                u.englishLevel,
                COALESCE(SUM(t.Trophys), 0) as TotalTrophies
            FROM 
                normalUserInfo u
            LEFT JOIN 
                userTrophys t ON u.email = t.emailUser
            GROUP BY 
                u.nickName, u.profileImg, u.englishLevel
            ORDER BY 
                TotalTrophies DESC
            LIMIT 50;
        `)
		res.status(200).json(rows)
	} catch (error) {
		console.error("Error al obtener el leaderboard:", error)
		res.status(500).json({ message: "Error al obtener el leaderboard" })
	}
}
