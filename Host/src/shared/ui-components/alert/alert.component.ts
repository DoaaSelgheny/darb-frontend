import { Component, Input, OnInit } from '@angular/core';
export enum AlertType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Input() type: AlertType;
  @Input() tootTipTitle = '';

  constructor() {}

  ngOnInit() {}
}
