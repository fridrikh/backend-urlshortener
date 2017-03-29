import mongoose from 'mongoose';
import shortId from 'shortid';

/**
 * UrlSchema
 */
const UrlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    redirectCount: { type: Number, default: 0, required: true }
});

/**
 * Hook save data url
 * Generate unique short url
 */
UrlSchema.pre('save', function(next) {
    this.originalUrl = this.originalUrl.toLowerCase();
    this.shortUrl = shortId.generate().toLowerCase();
    next();
});

/**
 * Validate original url
 */
UrlSchema.path('originalUrl').validate(function (value) {
    const regexp = /^(ftp|http|https):\/\/[^ "]+$/;
    return (value == null || value.trim().length < 1) || regexp.test(value)
});

/**
 * @typedef UrlSchema
 */
export default mongoose.model('Url', UrlSchema);

