//定义一个Mypromise类，通过constructor进行初始化
//初始化三个属性：promise状态state  成功时返回值value， 失败时的原因reason
//定义两个方法 resolve成功时调的方法，reject 失败时调用的方法

//定义一个Mypromise类，通过constructor进行初始化
//初始化三个属性：promise状态state  成功时返回值value， 失败时的原因reason
//定义两个方法 resolve成功时调的方法，reject 失败时调用的方法

class Mypromies{
    constructor(executor){
        this.state = "pending";
        this.value = undefined;
        this.reason = undefined;

    
        //定义成功时的操作 并改变promise状态
        let resolve = (value)=>{
            if(this.state === "pending"){
                this.value = value;
                this.state = "fullfilled";
            }
            

        }
        //定义失败时的操作 并改变promise状态
        let reject = (reason)=>{
            if(this.state === "pending"){
                this.reason = reason;
                this.state = "rejected";
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

    //定义then方法 接受resolve的值 同步
    then(onFullfilled,onRejected){
        if(this.state === "fullfilled" && typeof(onFullfilled) === "function"){
            onFullfilled(this.value);
        }

        if(this.state === "rejected" && typeof(onRejected) === "function"){
            onRejected(this.reason);
        }
    }


 
}

//测试代码
var p = new Mypromies( (resolve,reject) =>{
    resolve("success");
    // reject("fail");
})
console.log(p);
p.then( (val)=>{
        console.log(val)
    },(err)=>{
        console.log(err);
    }
)


