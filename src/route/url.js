import Router from 'koa-router';

const router = new Router();

router.post('/', async (ctx) => {
    const { url } = ctx.request.body;
    ctx.body = { success: true, original_url: url };
});

router.get('/:encode', async (ctx) => {
    ctx.body = { success: true, short_url: encode };
});

export default router;
