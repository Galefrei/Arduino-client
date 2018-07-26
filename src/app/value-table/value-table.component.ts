import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-value-table',
  templateUrl: './value-table.component.html',
  styleUrls: ['./value-table.component.css']
})
export class ValueTableComponent implements OnInit {

  @Input() points: {value: number, dateTime: string}[];

  constructor() { }

  ngOnInit() {
  }

}
