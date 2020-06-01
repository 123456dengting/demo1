var Persion = (options) => {
	var defaults = {
		name:"张三",
		age:14,
		color:"green",
	}
	this.options = defaults;
	for( key in options){
		this.options[key] = options[key];	
	}
	
	this.content = document.createElement("section");
	document.body.appendChild(this.content);
	
	
	this.createObj = function(time){
		var mask_div = document.createElement('div');
		mask_div.innerHTML = `<div>姓名:${this.options.name}</div><br>
							  <div>年龄:${this.options.age}</div><br>
							  <div>颜色:${this.options.color}</div><br>
							  <div>时间:${time}</div><br>
							`
		this.content.appendChild(mask_div);
	}
	this.init = function(time){
		this.createObj(time)
	}
	this.refresh = function(time){
		this.content.innerHTML = "";
		this.init(time)
	}
	return this;	
}

window.Persion = Persion;

//根据父子ID关系,循环格式化数据结构
let arrs = [
	{
		id:1,
		name:"1",
		parentId:0
	},
	{
		id:2,
		name:"1-2",
		parentId:1
	},
	{
		id:3,
		name:"1-3",
		parentId:1
	},
	{
		id:4,
		name:"4",
		parentId:0
	},
	{
		id:5,
		name:"4-5",
		parentId:4
	},
	{
		id:6,
		name:"4-5-6",
		parentId:5
	}
]

/**
 * 因为数组是引用类型,后面的子集改变之后.结果会相应的改变到当前的引用数组元素里面
 */
const _findArrChild = arr => {
	let findChildren = t => {
		return arr.filter(s => t.id === s.parentId)
	}

	return arr.filter(item => {
		let ch = findChildren(item)
		if (ch && ch.length > 0) {
			item['children'] = ch	
		}
		return item.parentId === 0
		
	})
}


var accountObj = {
	accountName:'dasgdhgfhgfj',
	_accountId: 100,
	get accountId(){
		return this._accountId
	},
	set accountId(value){
		console.log(value)
		this._accountId = value
	}
}

accountObj.accountId = 200
console.log('id', accountObj.accountId)


class Account {
	constructor(){
		this.name = "huihiji"
		this._id = 200
	}

	get id(){
		 return this._id
	}

	set id(v){
		this._id = v
	}

}


let account = new Account()

console.log(account.id)




var user = {
	_name:'狂奔的蜗牛'
};
Object.defineProperty(user,"name",{
  get:function(){
    return user._name;
  },
  set:function(value){
    user._name = value;
  }
})
 
console.log(user.name);
user.name = "狂奔的萝卜";
console.log(user.name);





