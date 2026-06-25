import { LocalizationService } from '@abp/ng.core';
import { Component, Input } from '@angular/core';
import { ReservationsGuestService } from '@proxy/reservations';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SharedModule } from 'src/shared/shared.module';
import { ConfrontationTypes } from 'src/shared/ui-components/confrontation-popup/confrontation-types.enum';

@Component({
  selector: 'app-terms-information',
  standalone: true,
  imports: [SharedModule,NzModalModule],
  templateUrl: './terms-information.component.html',
  styleUrl: './terms-information.component.scss'
})
export class TermsInformationComponent {
@Input() data: any;
lang = this.localizationService.currentLang;
isVisible :boolean= false;
isSuccess:boolean = false;
message:string
confrontationTypesEnum = ConfrontationTypes;

  constructor(private localizationService: LocalizationService,
    private reservationGuestService: ReservationsGuestService,
) {}
cancelReserve(){
  this.reservationGuestService.cancelReservationByIdAndRejectionReason(this.data.id,this.message).subscribe({
    next:next=>{
      this.isVisible = false;
      this.isSuccess = true;
      location.reload();
    }
  })
}
}  

