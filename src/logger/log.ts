import pino from 'pino';
import os from 'os';
import { v4 as uuid4 } from 'uuid';
import { multistream } from 'pino-multi-stream';
// const pinoElastic = require('pino-elasticsearch');

import { getTraceId } from './correlation';

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

const streams = [{ stream: process.stdout }];

const Pino = (filename: string): pino.Logger => {
  return pino({
    level: process.env.LEVEL || 'debug',
    name: process.env.APP_NAME || 'REST',
    messageKey: 'message',
    base: {
      pid: process.pid,
      host: os.hostname(),
      context: filename
    },
    prettifier: true,
    prettyPrint: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss.l',
      crlf: true,
      ignore: 'pid,context,traceId,message,name,host,err',
      messageFormat: (log) => {
        return `(${log.pid} on ${log.host}) [${log.name}/${log.context}] [traceId=${log.traceId}] - ${log.message}`
      }
    },
    enabled: true,
    formatters: {
      level: (level: string, number: number) => {
        return { level: level, number };
      },
    },
    mixin: () => {
      return { traceId: getTraceId() || uuid4() }
    }
  }, multistream(streams));
}
export default Pino;