import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import { ExpressLogger, Logger } from 'src';

const logger = new Logger('index.ts');

const app: Application = express();

app.use(ExpressLogger());
app.use(helmet());

app.use((req: Request, res: Response) => {
  res.status(200).json({ message: 'Service is healthy' });
});

app.listen(8000, () => {
  logger.info(`Server is listening to ${8000}`)
});