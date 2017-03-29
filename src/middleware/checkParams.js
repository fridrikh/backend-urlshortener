/**
 * Create short url and save to database
 * @param ctx context Koa
 * @param next middleware Koa
 * @returns {Promise.<void>}
 */
async function createUrl(ctx, next) {
    const { originalUrl } = ctx.request.body;
    console.log('createUrl', originalUrl);
    (!originalUrl)
        ? ctx.body = { success: false, error: { status: 400, title: 'Param originalUrl is required' } }
        : await next()
}

/**
 * Create custom user short url and save to database
 * @param ctx context Koa
 * @param next middleware Koa
 * @returns {Promise.<void>}
 */
async function createCustomUrl(ctx, next) {
    const { originalUrl, customShortUrl } = ctx.request.body;
    console.log(originalUrl, customShortUrl);
    (originalUrl && customShortUrl)
        ? await next()
        : ctx.body = { success: false, error: { status: 400, title: 'Param originalUrl is required' } }
}

export default { createUrl, createCustomUrl };
