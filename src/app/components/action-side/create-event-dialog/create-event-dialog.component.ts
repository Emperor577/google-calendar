import {Component, Inject, OnInit} from '@angular/core';
import {EventModel} from "../../../models/event.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.scss']
})
export class CreateEventDialogComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  get times(): string[] {
    return this.sharedService.times;
  }
  constructor(
    public dialogRef: MatDialogRef<CreateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventModel,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.data.participants.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(participant: string): void {
    const index = this.data.participants.indexOf(participant);

    if (index >= 0) {
      this.data.participants.splice(index, 1);
    }
  }
  getTimeRange(): string {
    return this.sharedService.getTimeRange(this.data.time);
  }

  removeEvent(): void {
    this.sharedService.removeEvent(this.data);
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
