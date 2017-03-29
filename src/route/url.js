import Router from 'koa-router';
import { Url } from '../controllers';
import { restError, checkParams } from '../middleware';

const router = new Router();

router.post('/', restError, checkParams.createUrl, Url.createUrl);

router.get('/:id', restError, Url.encodeUrl);

export default router;
