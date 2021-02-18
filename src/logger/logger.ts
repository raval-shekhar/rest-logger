import pino from 'pino';
import logger from './log';

export class Logger {
  logger: pino.Logger;

  constructor(filename: string) {
    this.logger = logger(filename.toUpperCase());
  }

  /**
   * Information log
   * 
   * @param {string} message - message
   * @param {object} object - info object 
   */
  info(message: string, object: Record<string, any> = {}) {
    this.logger.info(object, message);
  }

  /**
   * Error log
   * 
   * @param {string} message - message
   * @param {object} object - info object 
   */
  error(message: string, object: Record<string, any> = {}) {
    this.logger.error(object, message);
  }

  /**
   * Warning log
   * 
   * @param {string} message - message
   * @param {object} object - info object 
   */
  warn(message: string, object: Record<string, any> = {}) {
    this.logger.warn(object, message);
  }

  /**
   * Debug log
   * 
   * @param {string} message - message
   * @param {object} object - info object 
   */
  debug(message: string, object: Record<string, any> = {}) {
    this.logger.debug(object, message);
  }

  /**
   * Fatal log
   * 
   * @param {string} message - message
   * @param {object} object - info object 
   */
  fatal(message: string, object: Record<string, any> = {}) {
    this.logger.fatal(object, message);
  }
}