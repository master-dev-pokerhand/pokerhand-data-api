import { Router } from 'express';

import PokerHandDataController from './app/controllers/PokerHandDataController';

const routes = new Router();

routes.get('/pokerhand-data', PokerHandDataController.index);

export default routes;
