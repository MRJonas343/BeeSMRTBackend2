// src/models/GetDndItems1vs1.model.ts
import { pool } from "../config/connectionMySQL";
import { RowDataPacket } from "mysql2";

// Define el tipo para los ítems de Drag and Drop
export type DragAndDropItem = {
    id: number;
    word: string;
    image: string;
    EnglishLevel:string; // Esto es solo para el tipo, no se usa en la consulta
} & RowDataPacket;

const getDndItems = async (englishLevel: string): Promise<DragAndDropItem[]> => {
    try {
        // Consulta SQL que filtra por 'EnglishLevel'
        const [result] = await pool.query<DragAndDropItem[]>(
            "SELECT id, word, image FROM DragAndDropGame WHERE EnglishLevel = ? LIMIT 18",
            [englishLevel]
        );
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { getDndItems };
