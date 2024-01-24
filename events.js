const EventEmitter = require('events');
//const myEmitter = new EventEmitter();  or

class MyEmitter extends EventEmitter{}; //caps for class
const myEmitter = new MyEmitter();


// on and addListener are the same
// binding events like batman and robin to the emitter

myEmitter.on('batman', () => {
    console.log('A batman event occured.')
});

myEmitter.on('batman', () => {
    console.log('A second batman event occured.')
});

myEmitter.addListener('robin', () => {
    console.log('A robin event occured.')
});

console.log('Batman count: ' + myEmitter.listenerCount('batman'));
console.log('Robin count: ' + myEmitter.listenerCount('robin'));
console.log('Events: ' + myEmitter.eventNames());
// emitting the events
// emit is used to trigger the event

myEmitter.emit('batman'); // calls both batman events
myEmitter.emit('robin');
