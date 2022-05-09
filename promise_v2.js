//定义一个Mypromise类，通过constructor进行初始化
//初始化三个属性：promise状态state  成功时返回值value， 失败时的原因reason
//定义两个方法 resolve成功时调的方法，reject 失败时调用的方法

//定义一个Mypromise类，通过constructor进行初始化
//初始化三个属性：promise状态state  成功时返回值value， 失败时的原因reason
//定义三个方法 resolve成功时调的方法，reject 失败时调用的方法 then方法

//完成异步操作

class Mypromies{
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
        //成功后调用
        if(this.state === "fullfilled" && typeof(onFullfilled) === "function"){
            onFullfilled(this.value);
        }
        //失败后调用
        if(this.state === "rejected" && typeof(onRejected) === "function"){
            onRejected(this.reason);
        }

        //异步操作 state的值仍未改变
        //记录异步操作和传入的参数
        if(this.state === "pending" && typeof(onFullfilled) === "function"){
            this.onFullfilledList.push( ()=>{onFullfilled(this.value)})
        }
        if(this.state === "pending" && typeof(onRejected) === "function"){
            this.onRejectedList.push( ()=>{onRejected(this.reason)})
        }
        
    }


 
}

//测试代码
var p = new Mypromies( (resolve,reject) =>{
    setTimeout( ()=>{
        resolve("success");
        // reject("fail");
    }, 1000);
 
})
console.log(p);
//一次调用
p.then( (val)=>{
        console.log("第一次调用then: "+val);
    },(err)=>{
        console.log("第一次调用then: "+err);
    }
)
//二次调用
p.then((val)=>{
        console.log("第二次调用then: "+val);
    },(err)=>{
        console.log("第二次调用then: "+err);
    }

)

