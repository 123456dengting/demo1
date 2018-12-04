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