
import { Router } from 'express';
import { getMemoryGameLevelsController } from '../controllers/getMemoryGameLevels.controller';

const router = Router();

router.get('/', getMemoryGameLevelsController);

export { router };


