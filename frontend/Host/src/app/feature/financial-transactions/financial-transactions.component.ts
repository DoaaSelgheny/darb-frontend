import { Component, OnInit } from '@angular/core';
import { ReservationType } from '@proxy/reservation-users/reservation-type.enum';
import { TransferStatus } from '@proxy/reservation-users/transfer-status.enum';
import { ReservationsHostService } from '@proxy/reservations/reservations-host.service';
import { SharedModule } from 'src/shared/shared.module';
import { LocalizationService } from '@abp/ng.core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financial-transactions',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './financial-transactions.component.html',
  styleUrl: './financial-transactions.component.scss',
})
export class FinancialTransactionsComponent implements OnInit {
  transactions: any;
  transferStatus: any;
  selectedStatus = null;
  filterText: string;
  currentPage = 1;
  itemsPerPage = 8;
  totalCount = 0;
  loading: boolean = false;
  pageIndex = 1;
  reservationType = ReservationType;
  reservationTypeEnum = ReservationType;
  downloadToken: any;
  totalTransfers: any;
  upcomingTransfers: any;
  executedTransfers: any;
  lang: any;
  constructor(
    private service: ReservationsHostService,
    private localizationService: LocalizationService,
       private modalService: NzModalService,
                       private titleService: Title,
                       private router:Router
  ) {}

  ngOnInit(): void {
    this.lang = this.localizationService.currentLang;
    this.titleService.setTitle(this.localizationService.instant('::Host:Title:transaction'));
    this.transferStatus = Object.keys(TransferStatus)
      .filter(key => !isNaN(Number(TransferStatus[key as keyof typeof TransferStatus])))
      .map(key => ({
        id: Number(TransferStatus[key as keyof typeof TransferStatus]),
        displayName: this.localizationService.instant(
          '::Enum:TransferStatus.' + Number(TransferStatus[key as keyof typeof TransferStatus]),
        ),
      }));
    this.getStatics();
    this.getTransaction(this.currentPage);
  }
  getStatics() {
    this.service.getFinancialTransitionStatistic().subscribe(data => {
      this.totalTransfers = data.totalTransfers;
      this.upcomingTransfers = data.upcomingTransfers;
      this.executedTransfers = data.executedTransfers;
    });
  }
  getTransaction(pageIndex: number) {
    let dataSearch = JSON.parse(sessionStorage.getItem('dataSearch'))
    if(dataSearch){
      pageIndex =dataSearch.currentPage
    }
    // this.currentPage = pageIndex;
    this.loading = true;

    this.service
      .getFinancialTransitionListByFilter({
        maxResultCount: this.itemsPerPage,
        skipCount: (pageIndex - 1) * this.itemsPerPage,
      } as any)
      .subscribe(data => {
        this.transactions = data.items;
        this.totalCount = data.totalCount;
      });
      sessionStorage.removeItem('dataSearch')
      setTimeout(() => {
        this.currentPage = pageIndex
      }, 2000);
  }

  listOfColumn = [
    {
      title: this.localizationService.instant('::serviceName'),

      priority: 2,
    },
    {
      title: this.localizationService.instant('::reservationNumber'),

      priority: 3,
    },
    {
      title: this.localizationService.instant('::Netamounttransferred'),

      priority: 4,
    },
    {
      title: this.localizationService.instant('::Dateofcreation'),

      priority: 5,
    },
    {
      title: this.localizationService.instant('::Implementationdate'),

      priority: 6,
    },
    {
      title: this.localizationService.instant('::Transferstatus'),

      priority: 6,
    },
    {
      title: this.localizationService.instant('::details'),

      priority: 7,
    },
  ];
  changeFilter() {
    this.getTransaction(this.currentPage);
  }
  openRejectReason(reason: string) {
    this.modalService.warning({
      nzTitle: this.localizationService.instant('::ReasonforTransferFailure'),
      nzOkText:this.localizationService.instant('::Okay'),
      nzStyle:{ top: '50px', backgroundColor: '#f0f2f5' },
      nzContent: reason,
      nzCentered:true,
    });

  }
  goToDetails(id,reservationType,dta){
    let dataSearch ={
      currentPage: this.currentPage
    }
    this.router.navigate(['/reservation-details/', id,reservationType,dta])
    sessionStorage.setItem('dataSearch',JSON.stringify(dataSearch))
  }
}
