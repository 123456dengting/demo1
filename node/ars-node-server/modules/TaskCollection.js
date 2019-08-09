var { TaskState, Task } = require('./Task')
var logger = require('../utils/log')


class TaskCollection {
    constructor() {
        this.tasks = [];
        this.page = 5; //默认抓取页数
    }
    /**
     * 请求数据库的关键词列表, 请求完添加
     */
    __init__(keywords = []) {
      logger.trace('keywordsInit', keywords.length)
      keywords.forEach(a => {
            this.add(new TaskState({...a }));
        })
    }

    add(state, once = false) {
      // logger.trace('state', state)
      try {
        if (!(state instanceof TaskState)) throw Error("state必须为TaskState类型111。");
        let task = new Task(state);
        //如果是立即执行
        if (!once) {
          task.start();
        }else{
          task.executeOnce();
        }
        this.tasks.push(task);
      } catch (error) {
        logger.trace(error)
      }
        
    }

    edit(state) {

      try {
        if (!(state instanceof TaskState)) throw Error("state必须为TaskState类型。");

        let { task, index } = this.getTask(state.taskId);
        if (!!task) {
            task.reload(state);
        } else {
            //TODO 没找到task时的处理.
        }
      } catch (error) {
        logger.trace("state必须为TaskState类型。")
      }
        
    }

    remove(taskId) {
        let { task, index } = this.getTask(taskId);
        if (!!task) {
            task.destroy();
            this.tasks.splice(index, 1)
        }
    }

    executeNow(taskId) {
        let { task } = this.getTask(taskId);
        if (!!task) {
            task.executeOnce();
        }
    }

    getTask(taskId) {
        let result = {};
        for (let index = 0; index < this.tasks.length; index++) {
            const task = this.tasks[index];
            if (task.id == taskId) {
                result = { task, index }
                break;
            }
        }
        return result;
    }
}


module.exports = new TaskCollection()