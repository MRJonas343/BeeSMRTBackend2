import { pool } from "../config/connectionMySQL";
import { RowDataPacket } from "mysql2";

const getHangmanItems1vs1 = async (englishLevel: string) => {
    try {
        const [result] = await pool.query<RowDataPacket[]>(
            "SELECT word, hint FROM HangmanGameLevels WHERE EnglishLevel = ?;",
            [englishLevel]
        );

        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getHangmanItems1vs1 };
