import { Component, Input, OnInit } from '@angular/core';
import {
  VacationHomeHostService,
  VacationHomeWithNavigationPropertiesDto,
} from '@proxy/vacation-homes';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  @Input() id?;
  vacationHome: VacationHomeWithNavigationPropertiesDto = null;
  constructor(private service: VacationHomeHostService) {}

  ngOnInit(): void {
    if (this.id)
      this.service.getWithNavigationProperties(this.id).subscribe(data => {
        this.vacationHome = data;
      });
  }
}
