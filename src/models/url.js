import mongoose from 'mongoose';
import shortId from 'shortid';
import { Queue } from '../services';

/**
 * UrlSchema
 */
const UrlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    redirectCount: { type: Number, default: 0, required: true }
});

/**
 * Hook save
 * Create delayed task
 */
UrlSchema.pre('save', function(next) {
    Queue.createTask({ id: this.id });
    next();
});

/**
 * Validate original url
 */
UrlSchema.path('originalUrl').validate(function (value) {
    const regexp = /^(ftp|http|https):\/\/[^ "]+$/;
    return (value == null || value.trim().length < 1) || regexp.test(value)
});

UrlSchema.statics = {

    async createUrl({ originalUrl }) {
        try{
            return await this({
                originalUrl: originalUrl.toLowerCase(),
                shortUrl: shortId.generate().toLowerCase()
            }).save();
        } catch(error) { throw error }
    },

    async createCustomUrl({ originalUrl, customShortUrl }) {
        try{
            return await this({
                originalUrl: originalUrl.toLowerCase(),
                shortUrl: customShortUrl.toLowerCase()
            }).save();
        } catch(error) { throw error }
    }
};

/**
 * @typedef UrlSchema
 */
export default mongoose.model('Url', UrlSchema);

