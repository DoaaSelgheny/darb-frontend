import { ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienceGuestService } from '@proxy/experiences';
import { VacationHomeGuestService } from '@proxy/vacation-homes';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent implements OnInit {
  vacationHomeId: number;
  dateFrom: string;
  dateTo: string;
  experienceId: number;
  adults: string;
  children: string;
  constructor(
    private route: ActivatedRoute,
    private experienceservice: ExperienceGuestService,
    private service: VacationHomeGuestService,
    private alert: ToasterService,
    private router: Router,
  ) {
    this.vacationHomeId = this.route.snapshot.queryParams['vacationHomeId'];
    this.dateTo = this.route.snapshot.queryParams['dateTo'];
    this.dateFrom = this.route.snapshot.queryParams['dateFrom'];

    this.experienceId = this.route.snapshot.queryParams['experienceId'];
    this.adults = this.route.snapshot.queryParams['adults'];
    this.children = this.route.snapshot.queryParams['children'];

    this.experienceId = sessionStorage.getItem('experienceId')
      ? parseInt(sessionStorage.getItem('experienceId'), 10)
      : 0;
    this.adults = sessionStorage.getItem('adults');
    this.children = sessionStorage.getItem('children');
  }

  ngOnInit(): void {
    this.reserve();
  }

  reserve() {
    if (this.vacationHomeId) {
      // this.service
      //   .reserveByInput({
      //     vacationHomeId: this.vacationHomeId,
      //     dateFrom: this.dateFrom,
      //     dateTo: this.dateTo,
      //   })
      //   .subscribe(x => {
      //     this.alert.success('تم الحجز بنجاح');
      //     window.top.location.href = environment.application.baseUrl + '/reservation';
      //   });
    } else if (this.experienceId) {
      // this.experienceservice
      //   .reserveByInput({
      //     experienceId: this.experienceId,
      //     adults: +this.adults,
      //     children: +this.children,
      //   })
      //   .subscribe(x => {
      //     this.alert.success('تم الحجز بنجاح');
      //     this.clearSessionStorageKeys();
      //     window.top.location.href = environment.application.baseUrl + '/reservation';
      //   });
    }
  }

  // Function to clear specific keys from session storage
  clearSessionStorageKeys() {
    sessionStorage.removeItem('experienceId');
    sessionStorage.removeItem('adults');
    sessionStorage.removeItem('children');
  }
}
