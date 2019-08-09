class TaskWorker{
  constructor(task){
    if(!(task instanceof Task)) throw Error("");
    this.task = task;
    this.requestState = new this.requestState(
      {keyword = task.keyword, 
      page = task.page, 
      country, 
      lang, 
      userAgent
    }
    );
  }

  execute(){

  }

  requestHandle(innerPage){
    
  }

  responseHandle(innerPage){
    
  }

}