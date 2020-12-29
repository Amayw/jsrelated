class EventHub{
    //对不同的事件，分别维护一个数组，数组里面存放，事件触发后，需要执行的函数
    cache={}
    on(eventName,fn){
        this.cache[eventName]=(this.cache[eventName]||[]).concat(fn);
    }

    emit(eventName,argument){
        (this.cache[eventName]||[]).forEach(fn=>fn(argument))
    }

    off(eventName,fn){
        // this.cache[eventName]=this.cache[eventName].filter(item=>item!==fn);
        this.cache[eventName].splice(indexOf(this.cache[eventName],fn),1);
    }
}

export default EventHub;

function indexOf(arr,item){
    if(arr===undefined) return-1;
    let index=-1;
    for(let i=0;i<arr.length;i++){
        if(arr[i]===item){
            index=i;
            break;
        }
    }
    return index;
}
