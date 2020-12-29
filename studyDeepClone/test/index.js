const sinon=require("sinon");
const chai=require("chai");
const sinonChai=require("sinon-chai");
chai.use(sinonChai)
const assert=chai.assert;

const DeepClone=require('../src/index')
describe('new DeepClone().clone',()=>{
    it('是一个类',()=>{
        assert.isFunction(DeepClone);
    })
    it('可以复制基本类型',()=>{
        const num=66;
        const num2=new DeepClone().clone(num);
        assert(num2);
        const str='beauty';
        const str2=new DeepClone().clone(str);
        assert(str===str2);
        const bool=true;
        const bool2=new DeepClone().clone(bool);
        assert(bool===bool2);
        const u=undefined;
        const u2=new DeepClone().clone(u);
        assert(u===u2);
        const n=null;
        const n2=new DeepClone().clone(n);
        assert(n===n2);
        const s=Symbol();
        const s2=new DeepClone().clone(s);
        assert(s===s2);
    })
    describe('可以复制object',()=>{
        it('可以复制普通对象',()=>{
            const obj={
                name:'圆圆',
                child:{
                    name:'小圆圆'
                }
            }
            const obj2=new DeepClone().clone(obj);
            assert(obj!==obj2);
            assert(obj.name===obj2.name);
            assert(obj.child!==obj2.child);
            assert(obj.child.name===obj2.child.name);
        })

        it('可以复制数组对象',()=>{
            const arr=[[1,2],[3,4],[5,6]];
            const arr2=new DeepClone().clone(arr);
            assert(arr!==arr2);
            assert(arr[0]!==arr2[0]);
            assert(arr[1]!==arr2[1]);
            assert.deepEqual(arr,arr2);
        })

        it('可以复制函数',()=>{
            const fn=function(){
                return 1;
            }
            fn.xxx={yyy:{zzz:1}};
            const fn2=new DeepClone().clone(fn);
            assert(fn!==fn2);
            assert(fn.xxx.yyy.zzz===fn2.xxx.yyy.zzz);
            assert(fn.xxx.yyy!==fn2.xxx.yyy);
            assert(fn.xxx!==fn2.xxx);
            assert(fn()===fn2());
        })

        it('可以复制环',()=>{
            const c={name:'圆圆'};
            c.self=c;
            const c2=new DeepClone().clone(c);
            assert(c!==c2);
            assert(c.name===c2.name);
            assert(c.self!==c2.self);
        })

        // it('不会爆栈',()=>{
        //     const l={child:null};
        //     let p=l;
        //     for(let i=0;i<1000;i++){
        //         p.child={child:null};
        //         p=p.child;
        //     }
        //     const l2=new DeepClone().clone(l);
        //     assert(l!==l2);
        // })

        it('可以复制正则表达式',()=>{
            const r=new RegExp('hi\\d+','ig');
            r.xxx={yyy:{zzz:1}};
            const r2=new DeepClone().clone(r);
            assert(r!==r2);
            assert(r.source===r2.source);
            assert(r.flags===r2.flags);
            assert(r.xxx.yyy.zzz===r2.xxx.yyy.zzz);
            assert(r.xxx.yyy!==r2.xxx.yyy);
            assert(r.xxx!==r2.xxx);
        })

        it('可以复制日期',()=>{
            const d=new Date();
            const d2=new DeepClone().clone(d);
            assert(d!==d2);
            assert(d.getTime()===d2.getTime());
        })

        it('会自动跳过原型属性',()=>{
            const p=Object.create({name:'圆圆'});
            const p2=new DeepClone().clone(p);
            assert(p!==p2);
            assert.isFalse('name' in p2)
        })
    })
})
