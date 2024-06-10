import { RowDataPacket } from "mysql2";
import { pool } from "../config/connectionMySQL";

// Define el tipo de datos esperado para los resultados de la consulta
interface UserTrophy extends RowDataPacket {
  Level: string;
  Trophys: number;
}

// Función para obtener los registros del puntaje del usuario en los niveles
const getUserTrophys = async (emailUser: string, Game: string): Promise<UserTrophy[]> => {
  try {
    const [result] = await pool.query<UserTrophy[]>(
      "SELECT Level, Trophys FROM usersTrophys WHERE emailUser = ? AND Game = ?",
      [emailUser, Game]
    );

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getUserTrophys };
