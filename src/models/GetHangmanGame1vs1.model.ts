import { pool } from "../config/connectionMySQL";
import { RowDataPacket } from "mysql2";

interface Level {
    word: string;
    hint: string;
}

const getHangmanItems1vs1 = async (englishLevel: string): Promise<Level[]> => {
    try {
        const [result, fields] = await pool.query<RowDataPacket[]>(
            "SELECT word, hint FROM Levels WHERE EnglishLevel = ?",
            [englishLevel]
        );

        return result.map(row => ({
            word: row.word,
            hint: row.hint
        }));
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getHangmanItems1vs1 };
