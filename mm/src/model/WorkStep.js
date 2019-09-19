// import { WorkStepTypes } from "./WorkStepType";
import { Alarm } from "./Alarm";
import { uuidv4 } from "../utilities/uuid";

export class WorkStep {
  
  constructor(startTime, length, description, type, id = null) {

    this.id = id ? id : uuidv4();
    this.description = description;
    this.startTime = startTime;
    this.length = length;
    this.type = type;
    this.alarm = new Alarm(false, false);
  }

  clone() {
    const workStep = new WorkStep(this.startTime, this.length, this.description, this.type, this.id);
    workStep.alarm = this.alarm.clone();
    return workStep;
  }

  static create(workStepObj) {
    const workStep = new WorkStep(
      workStepObj.startTime, workStepObj.length, workStepObj.description, workStepObj.type, workStepObj.id);
    workStep.alarm = Alarm.create(workStepObj.alarm);
    return workStep;
  }

  static merge(src, dst) {
    dst.alarm.hasAlarmAtStart = src.alarm.hasAlarmAtStart;
    dst.alarm.hasAlarmAtEnd = src.alarm.hasAlarmAtEnd;
    src.description = dst.description;
    src.startTime = dst.startTime;
    src.length = dst.length;
    src.type = dst.type;
  }
}