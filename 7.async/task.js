"use strict"

class AlarmClock {
    constructor () {
        this.alarmCollection = [];
        this.timerId = null;
    }

addClock(time, callback, id) {
    if (id === null || typeof(id) != "number") {
        throw new Error("Параметр ID не был указан или указан неверно");
    }
    if (time === null || typeof(time) != "string") {
        throw new Error("Параметр Time не был указан или указан неверно");
    }
    let addId = this.alarmCollection.some(() => id == this.alarmCollection[0].id);
    if (addId === true) {
        console.error(`Будильник с таким параметром ID уже существует!`);
        return;
    }
    let signal = {id, time, callback};
    this.alarmCollection.push(signal);
}

removeClock(remId) {
    let beforeAlarm = this.alarmCollection.length;
    let del = this.alarmCollection.findIndex(() => remId == this.alarmCollection[0].id);    
      if (del !== -1) {
      this.alarmCollection.splice(del, 1);
    }
    let afterAlarm = this.alarmCollection.length;
      return beforeAlarm !== afterAlarm;
  }

getCurrentFormattedTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let now = `${hours}:${minutes}`;
    return now;
}

start(){
    if (this.timerId != null){
      return;
    }
    let interval = setInterval( () => {
        this.alarmCollection.forEach((el) => checkClock(el));
      }, 1000);
      this.timerId = interval;

    const checkClock = (el) => {
      if (this.getCurrentFormattedTime() === el.time) {
        return el.callback();
      }
    }
  }

  stop() {
    if(this.timerId == null) {
      return;
    }
    clearInterval(this.timerId);
    this.timerId = null;
  }

printAlarms() { 
    let alarms = this.alarmCollection.length;
    console.log(`Количество заведенных будильников: ${alarms}`); 
    this.alarmCollection.forEach((item) => console.log(`Будильник №${item.id} заведен на ${item.time}`))
}

clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}