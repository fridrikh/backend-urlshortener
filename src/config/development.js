export default {
    port: 4040,
    mongo: {
        mongoUri: 'mongodb://localhost/url-dev',
    },
    redis: {
        redisUri: '127.0.0.1',
        redisPort: 6379
    },
    delayedMilliseconds: 15 * 24 * 60 * 60 * 1000
}
