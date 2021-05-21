import { Request, Response } from "express";

interface HttpRequest {
  method?: string;
  url?: string;
  ip?: string;
  protocol?: string;
  userAgent?: string;
  status?: number
}

export class HttpSerializer {
  static request(req: Request): HttpRequest {
    const httpRequest: HttpRequest = {};
    httpRequest.method = req.method
    httpRequest.url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    httpRequest.protocol = `${req.httpVersion}`;
    httpRequest.ip = `${req.headers['x-real-ip'] || req.ip}`
    httpRequest.userAgent = req.get('User-Agent')
    return httpRequest;
  }
  static response(res: Response): HttpRequest {
    let httpRequest: HttpRequest = {};
    httpRequest.status = res.statusCode
    return httpRequest; 
  }
}