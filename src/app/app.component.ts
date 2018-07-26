import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public startDate: any = moment().startOf('day').format('YYYY-MM-DD[T]HH:mm');
  public endDate: any = moment().endOf('day').format('YYYY-MM-DD[T]HH:mm');

  public points: {value: number, dateTime: string}[] = [];

  public update() {
      const start = moment(this.startDate, 'YYYY-MM-DD[T]HH:mm').format('YYYY-MM-DD HH:mm:ss');
      const end = moment(this.endDate, 'YYYY-MM-DD[T]HH:mm').format('YYYY-MM-DD HH:mm:ss');

      this.client.get<any>('http://localhost:52773/csp/arduino/rest/temperatures/' + start + '/' + end)
          .pipe(map(value => value.result), tap(value => this.points = value))
          .subscribe();
  }

  constructor(private client: HttpClient) {

  }

}
