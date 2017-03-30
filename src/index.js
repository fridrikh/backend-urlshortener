import { createServer } from 'http';
import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import cors from 'kcors';
import config from './config';
import route from './route';

const app = new Koa();

mongoose.Promise = Promise;
mongoose.connect(config.mongo.mongoUri, {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
});

app.use(cors()); // Cross-Origin

app.use(logger()); // logger
app.use(bodyParser()); // parsing body from (Content-Type: application/x-www-form-urlencoded)

app.use(route.routes()); // connect routes
app.use(route.allowedMethods());

const server = createServer(app.callback());

server.listen(config.port, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`App is running on ${host}:${port}`);
});
