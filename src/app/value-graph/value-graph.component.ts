import {Component, OnInit, AfterViewInit, Input, OnChanges} from '@angular/core';
import * as moment from 'moment';

declare let google: any;

@Component({
  selector: 'app-value-graph',
  templateUrl: './value-graph.component.html',
  styleUrls: ['./value-graph.component.css']
})
export class ValueGraphComponent implements OnChanges {

    @Input() points: {value: number, dateTime: string}[] = [];

  constructor() {
      const drawChart = () => {
          this.drawChart();
      };

      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
  }

  ngOnChanges() {
      console.log(this.points);
      if (google.visualization !== null && google.visualization !== undefined) {
          this.drawChart();
      }
  }

  private drawChart() {
      const data = new google.visualization.DataTable();
      data.addColumn('datetime', 'Время');
      data.addColumn('number', 'Температура');

      data.addRows([...this.getLoadPoints()]);

      const options = {
          title: 'Данные о температуре'
      };

      const chart = new google.visualization.LineChart(document.getElementById('graph'));

      chart.draw(data, options);
  }

  private getLoadPoints() {
      return this.points.map(value => {
          return [
              moment(value.dateTime, 'YYYY-MM-DD HH:mm:ss').toDate(),
              value.value
          ];
      });
  }

}
