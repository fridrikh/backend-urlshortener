import Router from 'koa-router';
import { Url } from '../controllers';
import { restError, checkParams } from '../middleware';

const router = new Router();

router.post('/url/', restError, checkParams.createUrl, Url.createUrl);

router.post('/custom/', restError, checkParams.createCustomUrl, Url.createCustomUrl);

router.get('/:id', restError, Url.encodeUrl);

export default router;
