class NullOrUndefinedError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
        if (!this.message) {
            this.message = 'Null or undefined error';
        }
    }
}

/**
 * Custom error message
 * @param ctx context Koa
 * @param next middleware Koa
 * @returns {Promise.<void>}
 */
export default async function (ctx, next) {
    try {
        await next();
    } catch (err) {
        if (err == null) {
            err = new NullOrUndefinedError();
        }
        ctx.response.set('Content-Type', 'application/json');
        ctx.status = err.status || 500;
        ctx.body = JSON.stringify({
            success: false,
            error: {
                status: ctx.status,
                title: err.message
            }
        });
        ctx.app.emit('error', err, ctx);
    }
}

