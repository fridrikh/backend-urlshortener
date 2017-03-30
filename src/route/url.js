import Router from 'koa-router';
import { Url } from '../controllers';
import { restError, checkParams } from '../middleware';

const router = new Router();

router.use(restError);

router.post('/url/', checkParams.createUrl, Url.createUrl);

router.post('/custom/', checkParams.createCustomUrl, Url.createCustomUrl);

router.get('/:id', Url.encodeUrl);

export default router;
