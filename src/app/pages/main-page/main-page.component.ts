import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  selectedDate: Date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

  onDateChange(event: Date): void {
    this.selectedDate = event;
  }
}
