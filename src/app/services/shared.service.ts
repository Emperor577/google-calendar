import { Injectable } from '@angular/core';
import {EventModel} from "../models/event.model";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  events: {[key: string]: EventModel[]} = {};
  times = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ]
  constructor(
    public datePipe: DatePipe
  ) { }

  addOrUpdateEvent(newEvent: EventModel, oldEvent?: EventModel): void {
    if (oldEvent && Object.keys(oldEvent).length > 0) {
      if (oldEvent.date !== newEvent.date) {
        this.removeEvent(oldEvent);
        this.addEvent(newEvent);
        return;
      }
      this.updateEvent(newEvent, oldEvent);
      return;
    }
    this.addEvent(newEvent);
  }

  private updateEvent(newEvent: EventModel, oldEvent: EventModel): void {
    const date = this.datePipe.transform(newEvent.date, 'dd-MM-yyyy')!;
    const eventIndex = this.events[date].findIndex(e => e.time === oldEvent?.time);
    if (eventIndex > -1) {
      this.events[date][eventIndex] = newEvent;
    }
  }

  private addEvent(event: EventModel): void {
    const date = this.datePipe.transform(event.date, 'dd-MM-yyyy')!;
    if (this.events[date]) {
      this.events[date].push(event);
      return;
    }
    this.events[date] = [event];
  }

  removeEvent(event: EventModel): void {
    const date = this.datePipe.transform(event.date, 'dd-MM-yyyy')!;
    if (this.events[date]) {
      const eventIndex = this.events[date].findIndex(e => e.time === event?.time);
      this.events[date].splice(eventIndex, 1);
    }
  }

  getTimeRange(time: string): string {
    const startTimeIndex = this.times.findIndex(t => t === time);
    if (startTimeIndex > -1) {
      // todo check logic for the last element
      return `${time} - ${this.times[startTimeIndex + 1]}`;
    }
    return '';
  }
}
