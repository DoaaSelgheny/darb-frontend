
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExperienceImageType } from '@proxy/experience-images';
import { ExperienceHostService, ExperienceStatus, ExperienceWithNavigationPropertiesDto, VisibleStatus } from '@proxy/experiences';
import { VacationHomePublishStatus, VacationHomeStatus } from '@proxy/vacation-homes';
import { TosterService } from 'src/shared/services/toster.service';
import { isArray, LocalizationService, SessionStateService } from '@abp/ng.core';
import { ModalConfirmDataComponent } from 'src/shared/ui-components/modal-confirm-data/modal-confirm-data.component';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-experiment-item',
  templateUrl: './experiment-item.component.html',
  styleUrl: './experiment-item.component.scss',
})
export class ExperimentsItemComponent implements OnInit {
  @Input() experience: any;
  @Output() deleteEvent = new EventEmitter<number>();
  homeStatusEnum = ExperienceStatus;
  publishStatusEnum = VisibleStatus;
  publishStatus: boolean;
  isVisiblePublish:boolean = false
  statusPublish :boolean

  constructor(
    private toaster: TosterService,
    private localizationService: LocalizationService,
    private service: ExperienceHostService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
  ) {}

  ngOnInit(): void {
    this.checkSatus();
  }
  checkSatus() {
    if (this.experience?.experience?.visibleStatus === this.publishStatusEnum.Active) {
      this.publishStatus = true;
      this.cdr.detectChanges();
    } else {
      this.publishStatus = false;
      this.cdr.detectChanges();
    }
  }
  delete(id: number) {
    if (confirm('Are you sure?')) this.deleteEvent.emit(id);
  }
  handleSwitchChange(value: boolean, id: number) {

    if (this.experience?.experience?.experienceStatus!== this.homeStatusEnum.Published) {
      this.toaster.warning(
        this.localizationService.instant('::homeHoliday2:search:publishStatusWarn'),
      );

      setTimeout(() => {
        this.publishStatus=!this.publishStatus;
        this.cdr.detectChanges()
      }, 1000);
      this.isVisiblePublish =false

    } else {
      let status=value === true ? this.publishStatusEnum.Active : this.publishStatusEnum.InActive
      // let paylod = {
      //   id: id,
      //   visibleStatus:status ,
      // };
      this.service.changeVisibleStatusByIdAndVisibleStatus( id,
      status ).subscribe({
        next: next => {
          this.toaster.success(
            this.localizationService.instant(
              '::homeHoliday:search:publishStatusSuccess',
              'Success',
            ),

          );
          this.isVisiblePublish = false

          // if (next) {

          //   this.toaster.success(
          //     this.localizationService.instant(
          //       '::homeHoliday:search:publishStatusSuccess',
          //       'Success',
          //     ),
          //   );
          // } else {
          //   this.toaster.error(
          //     this.localizationService.instant(
          //       '::homeHoliday:search:publishStatusError',
          //       'Success',
          //     ),
          //   );

          // }
        },
        error: error => {
   
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
      nzOkText:this.localizationService.instant('::Okay'),
      nzStyle:{ top: '50px', backgroundColor: '#f0f2f5' },
      nzContent: reason,
      nzCentered:true,
    });
    // this.modalService.create({
    //   nzTitle: this.localizationService.instant('::homeHoliday:search:rejectReasonTitle'),
    //   nzContent: ModalConfirmDataComponent,
    // nzCentered:true,
    //   nzData: {
    //     reason: reason,
    //     img: 'assets/host/imgs/holiday-homes/rejectModalIcon.svg',
    //   },
    //   nzFooter: [
    //     {
    //       label: this.localizationService.instant('::homeHoliday:search:confirm'),
    //     },
    //   ],
    // });
  }
}
