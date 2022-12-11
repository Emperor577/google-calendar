import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateEventDialogComponent} from "./create-event-dialog/create-event-dialog.component";
import {SharedService} from "../../services/shared.service";
import {EventModel} from "../../models/event.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-action-side',
  templateUrl: './action-side.component.html',
  styleUrls: ['./action-side.component.scss']
})
export class ActionSideComponent implements OnInit {
  @Input() selectedDate!: Date;

  get date(): string {
    return this.datePipe.transform(this.selectedDate, 'dd-MM-yyyy')!;
  }

  get times(): string[] {
    return this.sharedService.times;
  }

  get events(): EventModel[] {
    return this.sharedService.events[this.date];
  }

  isSlotBooked(time: string): boolean {
    return this.events?.some(event => event.time === time);
  }

  getEvent(time: string): EventModel {
    return this.events?.find(event => event.time === time)!;
  }

  selectedTime = '';
  isDialogOpen = false;

  constructor(
    private dialog: MatDialog,
    private sharedService: SharedService,
    public datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
  }

  getTimeRange(time: string): string {
    return this.sharedService.getTimeRange(time);
  }

  openDialog(time: string): void {
    const event = {...this.getEvent(time)};
    this.selectedTime = time;
    this.isDialogOpen = true;
    const dialog = this.dialog.open(CreateEventDialogComponent, {
      width: '40%',
      height: '400px',
      data: {
        title: event.title ?? '',
        time: event.time ?? this.selectedTime,
        date: event.date ?? this.selectedDate,
        participants: event.participants ?? []
      }
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.sharedService.addOrUpdateEvent(result, event);
      }
      this.isDialogOpen = false;
      this.selectedTime = '';
    });
  }
}
