//定义一个Mypromise类，通过constructor进行初始化
//初始化三个属性：promise状态state  成功时返回值value， 失败时的原因reason
//定义两个方法 resolve成功时调的方法，reject 失败时调用的方法

//定义一个Mypromise类，通过constructor进行初始化
//初始化三个属性：promise状态state  成功时返回值value， 失败时的原因reason
//定义两个方法 resolve成功时调的方法，reject 失败时调用的方法

//完成then方法链式调用功能

class Mypromise{
    constructor(executor){
        this.state = "pending";
        this.value = undefined;
        this.reason = undefined;

        //异步操作以及同个promise多次调用then方法 记录这些操作
        this.onFullfilledList = [];
        this.onRejectedList = [];

    
        //定义成功时的操作 并改变promise状态
        let resolve = (value)=>{
            if(this.state === "pending"){
                this.value = value;
                this.state = "fullfilled";
                this.onFullfilledList.forEach(fn=>fn());// 执行异步操作
            }

            

        }
        //定义失败时的操作 并改变promise状态
        let reject = (reason)=>{
            if(this.state === "pending"){
                this.reason = reason;
                this.state = "rejected";
                this.onRejectedList.forEach(fn=>fn());// 执行异步操作
            }
           
        }
        //定义失败时的操作
        // 运行期间发生错误进行reject操作
        try{
            executor(resolve,reject);
        }catch(err){
            reject(err);
        }
    }

    //定义then方法 接受resolve的值
    then(onFullfilled,onRejected){
        //把then 方法的执行放到新promise的构造函数里执行
        let p2 = new Mypromise( (resolve,reject) => {
             //成功后调用
            if(this.state === "fullfilled" && typeof(onFullfilled) === "function"){
                //接受上个then方法里的返回值，并判断x的类型
                let x = onFullfilled(this.value);
                resolvePromise(x,resolve,reject);//处理返回值
                
            }
            //失败后调用
            if(this.state === "rejected" && typeof(onRejected) === "function"){
               
                //接受上个then方法里的返回值，并判断x的类型
                let y =  onRejected(this.reason);
                resolvePromise(y,resolve,reject);//处理返回值
            }

            //异步操作 state的值仍未改变
            //记录异步操作和传入的参数
            if(this.state === "pending" && typeof(onFullfilled) === "function"){
                this.onFullfilledList.push( ()=>{onFullfilled(this.value)});
            }
            if(this.state === "pending" && typeof(onRejected) === "function"){
                this.onRejectedList.push( ()=>{onRejected(this.reason)});
            }

        });

       
        
        return p2;//返回一个新的promise对象 完成链式操作
    }


 
}

//判断then方法里返回值的类型，如果返回的是promise对象，调用其then方法。普通值直接resolve
function resolvePromise(x,resolve, reject){
    if( x instanceof Mypromise){
        x.then(resolve,reject);
        //或者下面这种写法
        // x.then( (val)=>{
        //     resolve(val);
        // }, (err)=>{
        //     reject(err);
        // } );
    }else{
        resolve(x);
    }
}


//测试代码
//完成then方法链式调用功能
var p = new Mypromise( (resolve,reject) =>{
    // setTimeout( ()=>{
        resolve("success");
    //    reject("fail");
    // }, 1000);
 
})
console.log(p);
//链式调用
p.then( (val)=>{
        console.log("第一次调用then: "+val);
        return "seconed success";
    },(err)=>{
        console.log("第一次调用then: "+err);
        return "seconed fail";
    }
).then(
     (val)=>{
        console.log("第二次调用then: "+val);
    },(err)=>{
        console.log("第二次调用then: "+err);
    }
)


