const {connectToCloudant} = require('./db');
const moment = require('moment');
const tz = require('moment-timezone');

moment.tz.setDefault('America/Sao_Paulo');

const createErrorLog = (req, resp, next) => {
    const log = {
        type: 'error',
        errorMessage: req.err
    }
};

module.exports = {
    createErrorLog
}