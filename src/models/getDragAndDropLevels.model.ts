import { pool } from "../config/connectionMySQL";
import { RowDataPacket } from "mysql2";

// Define la interfaz para el nivel de Drag and Drop
interface DragAndDropLevel extends RowDataPacket {
    id: number;
    EnglishLevel: string;
    LevelName: string;
    levels: string; // Cambia 'levels' por 'Level' si la columna en la base de datos se llama 'Level'
}

const getDragAndDropGameLevels = async (game: string): Promise<DragAndDropLevel[]> => {
    try {
        const [result] = await pool.query<DragAndDropLevel[]>(
            "SELECT EnglishLevel, LevelName, levels FROM Levels WHERE Game = ?;",
            [game]
        );
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Database error");
    }
};

export { getDragAndDropGameLevels };
