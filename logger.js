const winston = require("winston");
// import "winston-daily-rotate-file";

// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     defaultMeta: {
//         service: 'staff-service'
//     },
  const loggerConfig ={

   transports: [
       new winston.transport.Console({
           level: 'verbose'
       }),
       new winston.transport.File({
           level: 'error',
           filename: './logs/systemlog.log'
       })
   ]
};
// Create the logger
const logger = winston.createLogger(loggerConfig);

// log a message
logger.silly('Trace message, Winston!');
logger.debug('Debug message, Winston!');
logger.verbose('A bit more info,Winston!');
logger.info('Hello, Winston!');
logger.warn('Heads up, Winston!');
logger.error('Danger,Winston!');