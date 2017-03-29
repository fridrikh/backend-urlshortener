import BullQueue from 'bull';
import { Url } from '../models';
import config from '../config';

/**
 * Create delayed task
 * @param data Object
 */
function createTask(data) {

    const urlQueue = BullQueue('url', config.redis.redisPort, config.redis.redisUri);

    urlQueue.process((job, done) => {
        Url.findByIdAndRemove(job.data.id)
            .then(() => done(null, { status: true }))
            .catch((err) => done(err))
    });

    urlQueue
        .on('error', (error) => {
            console.log('error job', error);
        })
        .on('completed', (job, result) => {
            console.log('result', result);
        });

    urlQueue.add(data, { removeOnComplete: true, delay: config.delayedMilliseconds });
}

export default { createTask };
