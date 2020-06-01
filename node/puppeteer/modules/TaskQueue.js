var logger = require('../utils/log')

class Queue{
  constructor(){
    this.items = [];
  }

 get isEmpty(){
    return this.count() === 0;
  }

  count(){
    return this.items.length;
  }

  values(){
    return this.items;
  }

  //入栈
  enqueue(item){
    if(!!item && !this.items.includes(item)){
      this.items.push(item);
    }
  }

  //出栈
  dequeue(){
    return this.items.shift();
  }

  //清空队列
  clearQueue(){
    //清空队列
    logger.trace('清空队列' + new Date())
    this.items = [];
  }
}


class TaskQueue extends Queue{
  constructor(){
    super()
  }
}

module.exports = new TaskQueue()