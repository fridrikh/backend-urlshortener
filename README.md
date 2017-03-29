# Backend Application for the UrlShort Project

### Installation

Backend Application requires to run:
* [Node.js 7.6.0](https://nodejs.org/)
* [MongoDB 3.4](https://www.mongodb.com/)
* [Redis 3.0.5](https://redis.io)
* [Yarn](https://yarnpkg.com/lang/en/)

Install the dependencies and devDependencies and start the development server (with the nodemon).

```sh
$ cd backend
$ yarn install
$ yarn watch
```

or (without a nodemon module)

```sh
$ cd backend
$ yandex install
$ NODE_ENV=development yarn build
$ yarn start
```

For production environments and start the production server.

```sh
$ yarn install
$ NODE_ENV=production yarn build
$ yarn start
```

### Modules

Backend is currently extended with the following main modules. Instructions on how to use them in your own application are linked below.

| Module | README |
| ------ | ------ |
| Koa 2 | https://github.com/koajs/koa |
| Mongoose | http://mongoosejs.com |

License
----

MIT
