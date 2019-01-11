class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    //静态属性,只有通过类名调用.
    static setAge(age){
        this.age = age;
        console.log("this,age",this.age);
    }
    setAge(age){
        this.age = age;
    }
    getAdder(a){
        return this.getAdderAjax(a);
    }
    getAdderAjax(a){
        return new Promise( (resolve,reject) => {
                setTimeout(()=>{
                    if(a){
                        resolve("success")
                    }else{
                        reject("fail")
                    }
                },1000)
                

        } )
    }
}


class Student extends Person{
    constructor(name,age,banji){
        super(name,age);
        this.banji = banji;
    }
    setBanji(banji){
        this.banji = banji
    }
}

var stu1 = new Student("张三",20,"编程");
stu1.setAge(30);
stu1.setBanji("商务");
console.log(stu1);
var adds = stu1.getAdder(1);
// promise
console.log("adds",adds.then(res=>{
    console.log("res",res);
}));



