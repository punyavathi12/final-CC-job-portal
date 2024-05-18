const winston = require('winston');
const path = require('path');

// Logging configuration
const logConfiguration = {
    transports: [
        new winston.transports.File({
            filename: path.join(__dirname, '..', 'logs', 'ApiServiceLogs.log'),
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            format: winston.format.combine(
                winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                winston.format.printf(info => `[${info.level.toUpperCase()}] - ${info.timestamp} - ${info.message}`)
            )
        })
    ]
};

// Create logger object
const logger = winston.createLogger(logConfiguration);

module.exports = logger;
