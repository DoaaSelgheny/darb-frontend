import {
  AfterViewInit,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NzProgressComponent } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-progress-group',
  templateUrl: './progress-group.component.html',
  styleUrl: './progress-group.component.scss',
})
export class ProgressGroupComponent implements AfterViewInit {
  percent: number = 0;
  @Input() set value(_value: number) {
    this.percent = _value;
    this.handelPercent();
  }
  @Input() progressCount = 0;
  progressEquity = 0;
  progressList: any[] = [];

  ngAfterViewInit(): void {
    this.progressEquity = 100 / this.progressCount;
    this.handelProgressList();
    this.handelPercent();
  }

  handelPercent() {
    this.progressList.forEach((progress, index) => {
      progress.equity = this.progressEquity * (index + 1);
      const isValid = this.progressEquity * index < this.percent;
      const calcPercent = (this.percent / progress.equity) * 100;
      if (isValid) {
        progress.value = calcPercent;
      } else {
        progress.value = 0;
      }
    });
  }

  handelProgressList() {
    const progress = {
      value: 0,
      index: 0,
      equity: 0,
    };

    for (let index = 0; index < this.progressCount; index++) {
      progress.index = index;
      this.progressList.push({ ...progress });
    }
  }
}
