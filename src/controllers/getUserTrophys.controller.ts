import { Request, Response } from "express";
import { handlerHttp } from "../utils/errorHandler";
import { getUserTrophys } from "../models/getUserTrophys.model";

const getUserTrophysController = async (req: Request, res: Response) => {
  try {
    const emailUser = String(req.headers.email);
    const game = String(req.headers.game);

    if (!emailUser || !game) {
      res.status(400).send("Missing required headers");
      return;
    }

    // Obtener los registros del puntaje del usuario en los niveles
    const userTrophys = await getUserTrophys(emailUser, game);

    if (!userTrophys.length) {
      res.status(404).send("No trophies found for the specified user and game");
      return;
    }

    res.json(userTrophys);
  } catch (error) {
    console.error(error);
    handlerHttp(res, "Error_GET_USER_TROPHYS");
  }
};

export { getUserTrophysController };
