import PinoHttp from 'pino-http';
import { Level } from 'pino';

import Logger from './log';

export const ExpressLogger = () => {
  return PinoHttp({
    logger: Logger('HTTP'),
    serializers: {
      error: (error) => {
        return error;
      },
      req: (req) => {
        let httpRequest: any = {};
        httpRequest.requestMethod = req.method
        httpRequest.requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
        httpRequest.protocol = `HTTP/${req.httpVersion}`
        httpRequest.remoteIp = req.ip.indexOf(':') >= 0 ? req.ip.substring(req.ip.lastIndexOf(':') + 1) : req.ip
        httpRequest.requestSize = req.socket.bytesRead
        httpRequest.userAgent = req.get('User-Agent')
        httpRequest.referrer = req.get('Referrer');
        return httpRequest;
      },
      res: (res) => {
        let httpRequest: any = {};
        httpRequest.status = res.statusCode
        return httpRequest;
      }
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