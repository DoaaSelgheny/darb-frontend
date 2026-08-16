import { Component, OnInit } from '@angular/core';
import { HostWalletsService } from '@proxy/host-wallets/host-wallets.service';
import { HostWalletStatus } from '@proxy/host-wallets/host-wallet-status.enum';
import { SharedModule } from 'src/shared/shared.module';
import { LocalizationService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-host-wallets',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './host-wallets.component.html',
  styleUrl: './host-wallets.component.scss',
})
export class HostWalletsComponent implements OnInit {
  wallets: any;
  walletStatus: any;
  selectedStatus = null;
  filterText: string;
  currentPage = 1;
  itemsPerPage = 8;
  totalCount = 0;
  loading: boolean = false;

  constructor(
    private service: HostWalletsService,
    private localizationService: LocalizationService,
    private toaster: ToasterService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.localizationService.instant('::Host:Title:hostWallets'));
    this.walletStatus = Object.keys(HostWalletStatus)
      .filter(key => !isNaN(Number(HostWalletStatus[key as keyof typeof HostWalletStatus])))
      .map(key => ({
        id: Number(HostWalletStatus[key as keyof typeof HostWalletStatus]),
        displayName: this.localizationService.instant(
          '::Enum:HostWalletStatus.' + Number(HostWalletStatus[key as keyof typeof HostWalletStatus]),
        ),
      }));
    this.getWallets(this.currentPage);
  }

  getWallets(pageIndex: number) {
    this.currentPage = pageIndex;
    this.loading = true;

    this.service
      .getList({
        status: this.selectedStatus,
        filterText: this.filterText,
        maxResultCount: this.itemsPerPage,
        skipCount: (pageIndex - 1) * this.itemsPerPage,
      } as any)
      .subscribe(data => {
        this.wallets = data.items;
        this.totalCount = data.totalCount;
        this.loading = false;
      });
  }

  listOfColumn = [
    {
      title: this.localizationService.instant('::hostName'),
      priority: 1,
    },
    {
      title: this.localizationService.instant('::reservationNumber'),
      priority: 2,
    },
    {
      title: this.localizationService.instant('::Netamounttransferred'),
      priority: 3,
    },
    {
      title: this.localizationService.instant('::Dateofcreation'),
      priority: 4,
    },
    {
      title: this.localizationService.instant('::HostWalletStatus'),
      priority: 5,
    },
    {
      title: this.localizationService.instant('::details'),
      priority: 6,
    },
  ];

  changeFilter() {
    this.getWallets(1);
  }

  confirmTransfer(row: any) {
    this.service.confirmTransfer(row.id).subscribe(() => {
      this.toaster.success(this.localizationService.instant('::TransferConfirmedSuccessfully'));
      this.getWallets(this.currentPage);
    });
  }

  downloadTransferReceipt(row: any) {
    this.service.downloadTransferReceipt(row.id).subscribe(result => {
      if (result?.content) {
        const byteArray = new Uint8Array(result.content);
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });
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
}
