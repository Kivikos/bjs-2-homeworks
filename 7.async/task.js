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
    let addId = this.alarmCollection.some((elem) => id == elem.id);
    if (addId === true) {
        console.error(`Будильник с таким параметром ID уже существует!`);
        return;
    }
    this.alarmCollection.push({id, time, callback});
}

removeClock(remId) {
    let beforeAlarm = this.alarmCollection.length;
    let del = this.alarmCollection.findIndex((elem) => remId == elem.id);    
      if (del !== -1) {
      this.alarmCollection.splice(del, 1);
    }
    return beforeAlarm !== this.alarmCollection.length;
  }

getCurrentFormattedTime() {
    let now = new Date().toLocaleTimeString("ru-Ru", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return now;
}

start(){
    if (this.timerId != null){
      return;
    }
    this.timerId = setInterval(() => {
        this.alarmCollection.forEach((elem) => checkClock(elem));
      }, 1000);
    const checkClock = (elem) => {
      if (this.getCurrentFormattedTime() === elem.time) {
      return elem.callback;
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