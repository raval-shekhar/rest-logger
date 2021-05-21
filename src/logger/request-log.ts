import { HttpSerializer } from './class-based';
import PinoHttp from 'pino-http';
import { Level } from 'pino';

import Logger from './log';

export const ExpressLogger = () => {
  return PinoHttp({
    logger: Logger('HTTP'),
    serializers: {
      req: HttpSerializer.request,
      res: HttpSerializer.response,
    },
    customLogLevel: (res, _err) => {
      let level: Level = 'info';
      if (res.statusCode >= 100) { level = 'info'; }
      if (res.statusCode >= 400) { level = 'warn'; }
      if (res.statusCode >= 500) { level = 'error'; }
      if (res.statusCode == 401 || res.statusCode == 403) { level = 'fatal'; }
      return level;
    },
    customSuccessMessage: (res) => {
      if (res.statusCode === 404) {
        return 'REQUEST NOT FOUND'
      }
      return 'REQUEST COMPLETED'
    },
    customErrorMessage: (error, res) => {
      return 'REQUEST ERRORED WITH STATUS CODE: ' + res.statusCode
    },
    wrapSerializers: false,
  });
}