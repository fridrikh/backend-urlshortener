/**
 * Create short url and save to database
 * @param ctx context Koa
 * @param next middleware Koa
 * @returns {Promise.<void>}
 */
async function createUrl(ctx, next) {
    const { originalUrl } = ctx.request.body;
    (!originalUrl)
        ? ctx.body = { success: false, error: { status: 400, title: 'Param originalUrl is required' } }
        : await next()
}

export default { createUrl };
