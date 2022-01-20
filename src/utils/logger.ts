import { id } from 'cls-rtracer';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const rTracerFormat = printf((info) => {
  const rid = id();
  return rid
    ? `${info.timestamp} [request-id:${rid}]: ${info.message}`
    : `${info.timestamp} [NO_REQUEST_ID]: ${info.message}`;
});

const options = {
  console: {
    stderrLevels: ['info', 'error', 'debug', 'warning'],
  },
  file: {
    dirname: '/logs/',
    level: 'debug',
  },
};

export const logger = createLogger({
  format: combine(timestamp(), format.errors({ stack: true }), rTracerFormat),
  transports: [
    new transports.Console(options.console),
    new transports.File(options.file),
  ],
});
