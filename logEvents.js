const EventEmitter = require ('events');
class MyEmitter extends EventEmitter{};
const myEmitter = new MyEmitter();
const path = require('path');
const fs = require('fs');

global.DEBUG = 'true';

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

module.exports = myEmitter;