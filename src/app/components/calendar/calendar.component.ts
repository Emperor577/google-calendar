import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateEventDialogComponent} from "../action-side/create-event-dialog/create-event-dialog.component";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() selectedDate!: Date;
  @Output() dateChangeNotifier: EventEmitter<Date> = new EventEmitter<Date>();
  constructor(
    private dialog: MatDialog,
    private sharedService: SharedService,
  ) { }
  ngOnInit(): void {
  }

  dateOnChange(event: Date) {
    this.dateChangeNotifier.emit(event);
  }

  openDialog(): void {
    const dialog = this.dialog.open(CreateEventDialogComponent, {
      width: '40%',
      height: '400px',
      data: {
        title: '',
        time: '00:00',
        date: this.selectedDate,
        participants: []
      }
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.sharedService.addOrUpdateEvent(result);
      }
    });
  }

}
