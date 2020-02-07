import { Router } from 'express';

import DadosPokerHandController from './app/controllers/DadosPokerHandController';

const routes = new Router();

routes.get('/dados-pokerhand', DadosPokerHandController.index);

export default routes;
