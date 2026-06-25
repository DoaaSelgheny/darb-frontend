import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ReservationSummaryComponent } from '../../components/reservation-summary/reservation-summary.component';
import { GuestInformationComponent } from '../../components/guest-information/guest-information.component';
import { TripDataComponent } from '../../components/trip-data/trip-data.component';
import { TripDetailsComponent } from '../../components/trip-details/trip-details.component';
import { ActivatedRoute } from '@angular/router';
import { ReservationsHostService } from '@proxy/reservations/reservations-host.service';
import { ReservationType } from '@proxy/reservation-users/reservation-type.enum';
import { ReservationStatus } from '@proxy/reservation-users/reservation-status.enum';
import { LocalizationService } from '@abp/ng.core';
import { FileManagementService } from 'src/shared/services/file-management.service';
import { Title } from '@angular/platform-browser';
import { TermsInformationComponent } from '../../components/terms-information/terms-information.component';

@Component({
  selector: 'app-reservation-details',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    ReservationSummaryComponent,
    GuestInformationComponent,
    TripDataComponent,
    TermsInformationComponent,
    TripDetailsComponent,
  ],
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.scss',
})
export class ReservationDetailsComponent implements OnInit {
  id: number;
  type:any;
  data = null;
    reservationTypeEnum=ReservationType;
    isVaction=false;
    reservationStatus=ReservationStatus;
    isTransaction='false';
  constructor(
    private service: ReservationsHostService,
    private route: ActivatedRoute,
            private localizationService: LocalizationService,
                private fileManagement: FileManagementService,
                private titleService: Title
  ) {
    this.isTransaction = this.route.snapshot.params['isTransaction'];
    this.id = +this.route.snapshot.params['id'];
    this.type = +this.route.snapshot.params['type'];

  }
  ngOnInit(): void {
    this.titleService.setTitle(this.localizationService.instant('::Host:Title:reversationDetails'));
    if(this.type===this.reservationTypeEnum.VacationHome){
    this.service.getVacationHomeReservationDetailsById(this.id).subscribe(x => {
      this.data = x;
    });
  this.isVaction=true;
  }
    if(this.type===this.reservationTypeEnum.Experience){
      this.service.getExperienceReservationDetailsById(this.id).subscribe(x => {
        this.data = x;
      });
    this.isVaction=false;
    }
  }
}
