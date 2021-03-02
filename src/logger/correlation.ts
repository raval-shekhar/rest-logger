import cls from 'cls-hooked';
import { v4 as uuid4 } from 'uuid';

const store = cls.createNamespace(`tarce-ms-id`);
const KEY = 'trace-id-key';

const withId = (fun: Function, id: string | undefined): void => {
  store.run(() => {
    store.set(KEY, id || uuid4());
    fun();
  });
};

export const getTraceId = () => store.get(KEY);

export const CorrelationMiddleware = () => (req: any, res: any, next: any): void => {
  store.bindEmitter(req);
  store.bindEmitter(res);
  store.bindEmitter(req.socket);
  withId(() => {
    const currentTraceId = getTraceId();
    res.set('x-request-id', currentTraceId);
    next();
  }, (req.get('x-request-id')))
};