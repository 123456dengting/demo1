const { writeFilePromise, mkdirs, moment, readFilePromise, appendFilePromise } = require('./utils');
const path = require('path');
const PATH = path.resolve(__dirname, '../logs/');
const fs = require('fs');
class Logs {

    static async addLogs(resData) {
        const filePath = path.resolve(PATH, 'monitor/' + moment('Y/M/D/'));
        const fileName = 'file.log';
        await this.saveDataAsLogFile(resData, filePath, fileName);
    }

    static async saveDataAsLogFile(logData, filePath, fileName) {
        try {
            mkdirs(filePath, async function () {
                const res = await appendFilePromise(logData, filePath + '/' + fileName);
            })
        } catch (err) {
            console.error(err);
            console.log('Save logData Error!');
        }
    }

}


const logger = require('tracer').colorConsole({
    transport: function (data) {
       //  console.log(data.output);
        Logs.addLogs(data.output + '\n');
    }
});



module.exports = logger;