import pino from 'pino';
import os from 'os';
// import { multistream } from 'pino-multi-stream';

// const pinoElastic = require('pino-elasticsearch');

// const streamToElastic = pinoElastic({
//   node: 'http://localhost:9200',
//   auth: {
//     username: 'elastic',
//     password: 'test'
//   },
//   'es-version': 7,
//   'flush-bytes': 10,
//   ecs: true,
//   consistency: 'one',
//   index: 'rest-logger',
//   type: ['info', 'error', 'warn', 'debug']
// });

// const streams = [{ stream: process.stdout }, { stream: streamToElastic }];

const Pino = (filename: string): pino.Logger => {
  return pino({
    level: process.env.LEVEL || 'debug',
    name: process.env.APP_NAME || 'REST',
    messageKey: 'message',
    base: {
      pid: process.pid,
      host: os.hostname,
      filename: filename,
      app: process.env.APP_NAME || 'REST'
    },
    prettifier: true,
    prettyPrint: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss.l',
      crlf: true,
      ignore: 'pid,filename,app,message',
      messageFormat: '[{filename}] - {message}'
    },
    enabled: true,
    formatters: {
      level: (level: string, number: number) => {
        return { level: level, number };
      },
    }
  });
}
export default Pino;