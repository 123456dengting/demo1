const schedule = require('node-schedule');
const { browserStatus, pageStatus, taskStatus } = require('../utils/enumLibs')
const { GoogleRequestState } = require('./RequestState')
const devices = require('puppeteer/DeviceDescriptors');
const TASK_QUEUE = require('./TaskQueue');
var moment = require('moment')
var {defaultIntervalHours} = require('../config/global')
var logger = require('../utils/log')

class TaskState {
    /**
     * @param {*} param
     */
    constructor({id, keyword = '', searchPages = 5, execTime = {}, country = [], devices = [], languages = [] }) {
        this.id = id;
        this.keyword = keyword;
        this.searchPages = searchPages;
        this.execTime = execTime;
        this.country = country;
        this.devices = devices;
        this.languages = languages;
    }
}

/**
 * 以一个关键词为任务单元, 在此任务中维护该关键词所有的行为。
 * 包括：请求的生成、发送、任务
 */
class Task {
    constructor(taskState) {
        this.init(taskState);
    }

    init(taskState){
      if (!(taskState instanceof TaskState)) throw Error("taskState必须为TaskState类型。");
      this.taskId = taskState.id;
      this.taskState = taskState;
      this.requestStates = [];
      this.job = null;
      this.status = taskStatus.notRun.value;
      this.intervalHours = defaultIntervalHours; //默认执行间隔是24小时
      // this.executeOnce()
    }

    reload(taskState){
      this.destroy();
      this.init(taskState);
      this.start();
    }

    /**
     * 开始任务
     */
    start() {
        this.status = taskStatus.running.value;
        this.createJob();
    }

    /**
     * 停止任务
     */
    stop() {
        this.status = taskStatus.stop.value;
    }

    /**
     * 销毁任务
     */
    destroy() {
        this.status = taskStatus.destroy.value;
        if (!!this.job) {
            this.job.cancel();
            this.job = null;
        }
        this.requestStates = [];
    }

    /**
     * 执行一次
     */
    executeOnce(){
      this.status = taskStatus.running.value;
      this.__handle__();
    }

    //启动任务
    __handle__() {
        if (this.status !== taskStatus.running.value) return;
        try {
          this.requestFactory();
        } catch (error) {
          logger.trace('关键词选项为空', error)
        }
        logger.trace('requestFactory', this.requestStates.length)
        for (let state of this.requestStates) {
            // 丢到执行队列里面
            TASK_QUEUE.enqueue(state);
        }
        logger.trace('TASK_QUEUE.count', TASK_QUEUE.count())
    }

    //生成请求
    requestFactory() {
        if (!!this.requestStates.length) return;
        let taskState = this.taskState
        const languages = taskState.languages || [];
        if (languages.length === 0) {
          throw Error("至少选择一种语言" + taskState.taskId)
        }
        const country = taskState.country || [];
        if (languages.length === 0) {
          throw Error("至少选择一个国家" + taskState.taskId)
        }
        const devices = taskState.devices || [];
        if (languages.length === 0) {
          throw Error("至少选择一种设备" + taskState.taskId)
        }
        languages.forEach(lang => {
            country.forEach(ct => {
                devices.forEach(userAgent => {
                    for (let i = 1; i <= this.taskState.searchPages; i++) {
                        let reqState = new GoogleRequestState({
                            keywordId: this.taskId,
                            keyword: this.taskState.keyword,
                            page: i,
                            country: ct,
                            lang,
                            userAgent: userAgent.userAgent,
                        });
                        this.requestStates.push(reqState);
                    }
                })
            })
        })
    }

    /**
     * 定时创建任务
     */
    createJob() {
        if (this.job != null) return;

        let { execTime } = this.taskState;
        let rule = new schedule.RecurrenceRule();
        
        let baseTime = moment(new Date("2019-10-01 " + execTime[0].time)).format("HH:mm")
        let baseHour = Number(baseTime.split(':')[0])
        let baseMinute = Number(baseTime.split(':')[1])
        let intervalHours = Number(execTime.intervalHours || this.intervalHours);
        while(baseHour > intervalHours && baseHour > 0){
          baseHour = baseHour - intervalHours
        }
        let hourFlag = baseHour;
        let hourRange = [hourFlag];

        while (hourFlag < 24) {
            hourFlag = hourFlag + intervalHours;
            if (hourFlag < 24 && hourFlag >= 0) {
              hourRange.push(hourFlag);
            }
        }

        let hour0 = hourRange.findIndex(t => t === 0) 

        let hour24 = hourRange.findIndex(t => t === 24) 
        //如果同同时包含24时和0时, 删除一个
        if (hour0 > -1 && hour24 > -1) {
          hourRange.splice(hour24, 1)
        }

        rule.hour = hourRange;
        rule.minute = baseMinute;

        this.job = schedule.scheduleJob(rule,  async () => {
          //启动任务
          await this.__handle__()
        })
    }
}


module.exports = {TaskState, Task}