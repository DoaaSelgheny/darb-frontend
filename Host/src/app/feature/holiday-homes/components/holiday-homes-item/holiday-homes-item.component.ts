import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';

import {
  VacationHomeHostService,
  VacationHomePublishStatus,
  VacationHomeStatus,
} from '@proxy/vacation-homes';
import { TosterService } from 'src/shared/services/toster.service';
import { LocalizationService } from '@abp/ng.core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalConfirmDataComponent } from 'src/shared/ui-components/modal-confirm-data/modal-confirm-data.component';

@Component({
  selector: 'app-holiday-homes-item',
  templateUrl: './holiday-homes-item.component.html',
  styleUrl: './holiday-homes-item.component.scss',
})
export class HolidayHomesItemComponent implements OnInit {
  @Input() home: any = null;
  @Input() numberOfConfirmedReservations: any;
  @Input() rating:number = 0
  homeStatusEnum = VacationHomeStatus;
  publishStatusEnum = VacationHomePublishStatus;
  isVisiblePublish: boolean = false;
  @Output() outputPublish = new EventEmitter<boolean>();
  publishStatus: boolean;
  statusPublish: boolean;
  constructor(
    private service: VacationHomeHostService,
    private toaster: TosterService,
    private localizationService: LocalizationService,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.checkSatus();
  }
  checkSatus() {
    if (this.home.vacationHomePublishStatus === this.publishStatusEnum.Published) {
      this.publishStatus = true;
      this.cdr.detectChanges();
    } else {
      this.publishStatus = false;
      this.cdr.detectChanges();
    }
  }
  handleSwitchChange(value: boolean, id: number) {
    if (this.home?.vacationHomeStatus!== this.homeStatusEnum.Accepted) {
      this.toaster.warning(
        this.localizationService.instant('::homeHoliday:search:publishStatusWarn'),
      );

      setTimeout(() => {
        this.publishStatus=!this.publishStatus;
        this.cdr.detectChanges()
      }, 1000);
      this.isVisiblePublish =false

    } else {
    let paylod = {
      id: id,
      vacationHomePublishStatus:
        value === true ? this.publishStatusEnum.Published : this.publishStatusEnum.UnPublished,
    };
    this.service.changeVacationHomePublishStatusByInput(paylod).subscribe({
      next: next => {
        if (next) {
          this.toaster.success(
            this.localizationService.instant(
              '::homeHoliday:search:publishStatusSuccess',
              'Success',
            ),
          );
          this.isVisiblePublish = false;
        } else {
          this.toaster.error(
            this.localizationService.instant('::homeHoliday:search:publishStatusError', 'Success'),
          );
          this.outputPublish.emit(true);
          this.isVisiblePublish = false;
        }
      },
      error: error => {

        this.outputPublish.emit(true);
        this.isVisiblePublish = false;
        setTimeout(() => {
          this.publishStatus=!this.publishStatus;
          this.cdr.detectChanges()
        }, 1000);
      },
    });}
  }
  openRejectReason(reason: string) {
    this.modalService.warning({
      nzTitle: this.localizationService.instant('::resonOfRejected'),
      nzOkText: this.localizationService.instant('::Okay'),
      nzStyle: { top: '50px', backgroundColor: '#f0f2f5' },
      nzContent: reason,
      nzCentered: true,
    });
  }
}
