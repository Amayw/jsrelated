import EventHub from '../src';

const eventHub=new EventHub();

const fn1=(argument)=>{
    console.log('被调用了');
    console.log(argument);
}
eventHub.on('xxx',fn1)
const fn2=(argument)=>{
    console.log('被调用了2');
    console.log(argument);
}
eventHub.on('xxx',fn2)

eventHub.off('xxx',fn1);
eventHub.emit('xxx','我想吃芋圆');
