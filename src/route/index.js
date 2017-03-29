import Router from 'koa-router';
import url from './url';

const router = new Router();

router.use('/url', url.routes());

export default router;
