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
}


class TaskQueue extends Queue{
  constructor(){
    super()
  }
}

module.exports = new TaskQueue()