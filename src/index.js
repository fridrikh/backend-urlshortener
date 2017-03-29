import { createServer } from 'http';
import Koa from 'koa';

const app = new Koa();

const server = createServer(app.callback());

server.listen(4040, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`App is running on ${host}:${port}`);
});
