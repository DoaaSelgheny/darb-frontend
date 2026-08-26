import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ReservationsHostService } from '@proxy/reservations/reservations-host.service';
import { ReservationWorkflowService } from '@proxy/reservations/reservation-workflow.service';
import { ReservationStatus } from '@proxy/reservation-users/reservation-status.enum';
import { LocalizationService } from '@abp/ng.core';
import { ReservationType } from '@proxy/reservation-users/reservation-type.enum';
import { FileManagementService } from 'src/shared/services/file-management.service';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToasterService } from '@abp/ng.theme.shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentType } from '@proxy/reservation-users';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [SharedModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss',
})
export class ReservationsComponent implements OnInit {
  reservations: any;
  reservationStatus: any;
  selectedStatus = null;
  filterText: string;
  currentPage = 1;
  itemsPerPage = 12;
  totalCount = 0;
  loading: boolean = false;
  pageIndex = 1;
  reservationType = ReservationType;
  reservationTypeEnum = ReservationType;
paymentType = PaymentType
  downloadToken: any;
  rejectionReason = '';
  selectedRejectionReason = '';
  @ViewChild('rejectionReasonModal') rejectionReasonModal: TemplateRef<any>;
  @ViewChild('confirmationModal') confirmationModal: TemplateRef<any>;
  constructor(
    private service: ReservationsHostService,
    private workflowService: ReservationWorkflowService,
    private localizationService: LocalizationService,
    private router: Router,
    private modalService: NzModalService,
    private toaster: ToasterService,
    private titleService: Title,
      private modal2Service: NgbModal,
  ) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/reservations') {

      }
    });
  }
ReservationStatus = ReservationStatus
  ngOnInit(): void {
    console.log("currentPage", this.currentPage)
    this.titleService.setTitle(this.localizationService.instant('::Host:Title:reversation'));
    this.reservationStatus = Object.keys(ReservationStatus)
      .filter((key) => !isNaN(Number(ReservationStatus[key as keyof typeof ReservationStatus])))
      .map((key) => ({ id: Number(ReservationStatus[key as keyof typeof ReservationStatus]), displayName: this.localizationService.instant("::Enum:ReservationStatus." + Number(ReservationStatus[key as keyof typeof ReservationStatus])) })).slice(0, 4);

    this.getReservation(this.currentPage);

  }
  getReservation(pageIndex: number) {
    let dataSearch = JSON.parse(sessionStorage.getItem('dataSearch'))
    if (dataSearch) {
      this.selectedStatus = dataSearch.selectedStatus
      this.filterText = dataSearch.filterText
      pageIndex = dataSearch.currentPage
    }

    this.loading = true;
    this.service.getReservationListByFilter({

      reservationStatus: this.selectedStatus,
      filterText: this.filterText,
      maxResultCount: this.itemsPerPage,
      skipCount: (pageIndex - 1) * this.itemsPerPage,

    } as any).subscribe(data => {
      this.reservations = data.items;
      this.totalCount = data.totalCount;
    });
    sessionStorage.removeItem('dataSearch')
    setTimeout(() => {
      this.currentPage = pageIndex
    }, 2000);
  }

  export() {

    this.service.getDownloadToken().subscribe(data => {
      this.downloadToken = data.token;
      this.service.getListAsExcelFile({

        reservationStatus: this.selectedStatus,
        filterText: this.filterText,
        downloadToken: data.token

      } as any).subscribe(data => {
        this.downloadBlob(data, 'reversation')
      });
    });


  }


  downloadBlob(blob, fileName) {
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element and set its attributes
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName; // Specify the file name

    // Append the anchor to the body, click it, and then remove it
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Release the Blob URL to free memory
    URL.revokeObjectURL(url);
  }
  listOfColumn = [

    {
      title: this.localizationService.instant("::guestName"),

      priority: 1,
    },
    {
      title: this.localizationService.instant("::serviceName"),

      priority: 2,
    },
    {
      title: this.localizationService.instant("::reservationNumber"),

      priority: 3,
    },
    {
      title: this.localizationService.instant("::serviceType"),

      priority: 4,
    },
    {
      title: this.localizationService.instant("::creationDate"),

      priority: 5,
    },
    {
      title: this.localizationService.instant("::reversationStatus"),

      priority: 6,
    },
    {
      title: this.localizationService.instant("::BookingRating"),

      priority: 7,
    },
    {
      title: this.localizationService.instant("::details"),

      priority: 8,
    },
  ];
  changeFilter() {
    this.getReservation(this.currentPage);
  }
  goToDetails(id, reservationType, dta) {
    let dataSearch = {
      selectedStatus: this.selectedStatus,
      filterText: this.filterText,
      currentPage: this.currentPage
    }
    this.router.navigate(['/reservation-details/', id, reservationType, dta])
    sessionStorage.setItem('dataSearch', JSON.stringify(dataSearch))
  }
  approveReservation(row: any) {
    this.workflowService.approveReservation(row.id).subscribe(data => {
      this.toaster.success(this.localizationService.instant('::ReservationApprovedSuccessfully'));
      this.getReservation(this.currentPage); // Refresh the list
    });
  }

  showRejectionReason(row: any) {
    this.selectedRejectionReason = row?.rejectionReason || row?.reason || row?.rejectReason || this.localizationService.instant('::NoRejectionReason') || 'No rejection reason provided';
    this.modalService.create({
      nzContent: this.rejectionReasonModal,
      nzCentered: true,
      nzMaskClosable: false,
      nzKeyboard: false,
      nzFooter: null,
    });
  }

  rejectReservation(row: any) {
    this.rejectionReason = '';
    this.modalService.create({
      nzContent: this.confirmationModal,
      nzCentered: true,
      nzMaskClosable: false,
      nzKeyboard: false,
      nzOnOk: () => {
        if (this.rejectionReason?.trim()) {
          this.workflowService.rejectReservation(row.id, this.rejectionReason.trim()).subscribe(() => {
            this.toaster.success(this.localizationService.instant('::ReservationRejectedSuccessfully'));
            this.getReservation(this.currentPage);
          });
        }
      },
    });
  }


  confirmPaymentReceipt(row: any) {
    this.workflowService.confirmPaymentReceipt(row.id).subscribe(() => {
      this.toaster.success(this.localizationService.instant('::ReservationApprovedSuccessfully'));
      this.getReservation(this.currentPage);
    });
  }

  rejectPaymentReceipt(row: any) {
    this.rejectionReason = '';
    this.modal2Service.open(this.confirmationModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    }).result.then(
      (action) => {
        if (action === 'approve' && this.rejectionReason?.trim()) {
          this.workflowService.rejectPaymentReceipt({
            reservationId: row.id,
            reason: this.rejectionReason.trim(),
          }).subscribe(() => {
            this.toaster.success(this.localizationService.instant('::ReservationRejectedSuccessfully'));
            this.getReservation(this.currentPage);
          });
        }
      },
      () => {
        // Modal dismissed, do nothing
      }
    );
  }

  downloadReceipt(row: any) {
    this.workflowService.downloadPaymentReceipt(row.id).subscribe(result => {
      if (result?.content) {
        const blob = this.base64ToBlob(result.content as any, 'application/octet-stream');
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = result.name || `receipt-${row.id}`;
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        this.toaster.error(this.localizationService.instant('::FileNotExisted'));
      }
    });
  }

  private base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }



}
