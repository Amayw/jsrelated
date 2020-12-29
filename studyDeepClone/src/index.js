// let cache=[];
// function deepClone(source){
//     if(source instanceof Object){
//         let copySource=findCache(cache,source);
//         if(copySource){
//             //有缓存
//             return copySource;
//         }else {
//             //没有缓存
//             let res;
//             if(source instanceof Array){
//                 res=[];
//             }else if(source instanceof Function){
//                 res=function(){
//                     return source.apply(this,arguments);
//                 };
//             }else if(source instanceof RegExp){
//                 res=new RegExp(source.source,source.flags);
//             }else if(source instanceof Date){
//                 res=new Date(source);
//             }else{
//                 res={};
//             }
//             cache.push([source,res]);
//             for(let key in source){
//                 if(source.hasOwnProperty(key)){
//                     res[key]=deepClone(source[key]);
//                 }
//             }
//             return res;
//         }
//     }
//     return source;
// }
//
// module.exports=deepClone
//
// function findCache(array,obj){
//     for(let i=0;i<array.length;i++){
//         if(array[i][0]===obj){
//             return array[i][1];
//         }
//     }
//     return undefined;
// }

//上面的cache共享会造成数组污染，使用面向对象的方法解决比较简单
class DeepClone{
    constructor() {
        this.cache=[];
    }

    clone(source){
        if(source instanceof Object){
            let copySource=this.findCache(this.cache,source);
            if(copySource){
                //有缓存
                return copySource;
            }else {
                //没有缓存
                let res;
                if(source instanceof Array){
                    res=[];
                }else if(source instanceof Function){
                    res=function(){
                        return source.apply(this,arguments);
                    };
                }else if(source instanceof RegExp){
                    res=new RegExp(source.source,source.flags);
                }else if(source instanceof Date){
                    res=new Date(source);
                }else{
                    res={};
                }
                this.cache.push([source,res]);
                for(let key in source){
                    if(source.hasOwnProperty(key)){
                        res[key]=this.clone(source[key]);
                    }
                }
                return res;
            }
        }
        return source;
    }

    findCache(array,obj){
        for(let i=0;i<array.length;i++){
            if(array[i][0]===obj){
                return array[i][1];
            }
        }
        return undefined;
    }
}


module.exports=DeepClone


