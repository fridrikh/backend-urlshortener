import { Url } from '../models';

/**
 * Create short url
 * @param ctx context Koa
 * @returns {Promise.<void>}
 */
async function createUrl(ctx) {
    try{
        const { originalUrl } = ctx.request.body;

        const url = await Url.findOne({ originalUrl: originalUrl.toLowerCase() });

        (!url)
            ? ctx.body = { success: true, url: await Url.createUrl({ originalUrl }) }
            : ctx.body = { success: true, url: url };

    } catch(error) { throw error }
}

/**
 * Create custom short url
 * @param ctx context Koa
 * @returns {Promise.<void>}
 */
async function createCustomUrl(ctx) {
    try{
        const { originalUrl, customShortUrl } = ctx.request.body;
        const findUrls = await Url.findOne({ $or:[ { originalUrl }, { shortUrl: customShortUrl } ]});

        (findUrls)
            ? ctx.body = { success: false, error: { status: 400, message: 'Short or original url is exist' } }
            : ctx.body = { success: true, url: await Url.createCustomUrl({ originalUrl, customShortUrl })  }

    } catch(error) { throw error }
}

/**
 * Encoded short url
 * @param ctx context Koa
 * @returns {Promise.<void>}
 */
async function encodeUrl(ctx) {
    try{
        const { params: { id } } = ctx;

        const urlData = await Url.findOneAndUpdate(
            { shortUrl: id.toLowerCase() },
            { $inc: { redirectCount: 1 } }
        );

        (urlData)
            ? ctx.redirect(urlData.originalUrl)
            : ctx.body = { success: false, error: { status: 400, message: 'Not found url' } }

    } catch(error) { throw error }
}


export default { createUrl, createCustomUrl, encodeUrl };
