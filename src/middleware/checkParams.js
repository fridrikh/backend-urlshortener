/**
 * Create short url and save to database
 * @param ctx context Koa
 * @param next middleware Koa
 * @returns {Promise.<void>}
 */
async function createUrl(ctx, next) {
    const { originalUrl } = ctx.request.body;
    (!originalUrl)
        ? ctx.body = { success: false, error: { status: 400, message: 'Param originalUrl is required' } }
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
    (originalUrl && customShortUrl)
        ? await next()
        : ctx.body = { success: false, error: { status: 400, message: 'Param originalUrl or customShortUrl is required' } }
}

export default { createUrl, createCustomUrl };
