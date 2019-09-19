import { uuidv4 } from "../utilities/uuid";

export class Alarm {
  
  constructor(hasAlarmAtStart, hasAlarmAtEnd, id = null) {
    this.hasAlarmAtStart = hasAlarmAtStart;
    this.hasAlarmAtEnd = hasAlarmAtEnd;
    this.id = id ? id : uuidv4();
  }

  clone() {
    return new Alarm(
      this.hasAlarmAtStart, this.hasAlarmAtEnd, this.id);
  }

  static create(alarmObj) {
    return new Alarm(
      alarmObj.hasAlarmAtStart, alarmObj.hasAlarmAtEnd, alarmObj.id);
  }

}