//Node.js common core global modules

const EventEmitter = require ('events');
class MyEmitter extends EventEmitter{};
const myEmitter = new MyEmitter();
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

//NPM installed Modules ( npm i date-fns uuid )
const {format, getYear} = require('date-fns');
const {v4:uuid} = require ('uuid');

global.DEBUG = true;

myEmitter.on('route', (url) =>{
    const d = new Date();
    if (DEBUG) console.log (`Route event on ${url} occured on ${d}.`);//logs date and time to console when an event is triggered.
    if(!fs.existsSync(path.join(__dirname, 'logs'))) {
        fs.mkdirSync(path.join(__dirname, 'logs'));
      } // if file exists, do nothing. If it doesn't,create it.
    fs.appendFile(path.join(__dirname, 'logs', 'route.log'), `Route Event on: ${url} at ${d}\n`, (error) => {
    if(error) throw error;
    });
})

myEmitter.on('error', (message) => {
    const d = new Date();
    if(DEBUG) console.log(`Error: ${message} at ${d}`);
    if(!fs.existsSync(path.join(__dirname, 'logs'))) {
      fs.mkdirSync(path.join(__dirname, 'logs'));
    }
    fs.appendFile(path.join(__dirname, 'logs', 'error.log'), `Error: ${message} at ${d}\n`, (err) => {
      if(err) throw err;
    });
  }); 

  
  myEmitter.on('event', async (event, level, message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${level}\t${event}\t${message}\t${uuid()}`;
    try {
        // Include year when managing log folders
        const currFolder = 'logs/' + getYear(new Date());
        if(!fs.existsSync(path.join(__dirname, 'logs/'))) {
            // if the parent directory logs/ doesn't exist, create it
            await fsPromises.mkdir(path.join(__dirname, 'logs/'));
            if(!fs.existsSync(path.join(__dirname, currFolder))) {
                // create the directory for the year ./logs/yyyy
                await fsPromises.mkdir(path.join(__dirname, currFolder));
            }
        }
        else {
            if(!fs.existsSync(path.join(__dirname, currFolder))) {
                // create the directory for the year ./logs/yyyy
                await fsPromises.mkdir(path.join(__dirname, currFolder));
            }
        }
        // Include todays date in filename
        if(DEBUG) console.log(logItem);
        const fileName = `${format(new Date(), 'yyyyMMdd')}` + '_http_events.log';
        await fsPromises.appendFile(path.join(__dirname, currFolder, fileName), logItem + '\n');
    } catch (err) {
        console.log(err);
    };
  }); 



module.exports = myEmitter;