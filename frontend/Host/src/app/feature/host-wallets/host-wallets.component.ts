import { Component, OnInit } from '@angular/core';
import { HostWalletsService } from '@proxy/host-wallets/host-wallets.service';
import { HostWalletStatus } from '@proxy/host-wallets/host-wallet-status.enum';
import { SharedModule } from 'src/shared/shared.module';
import { LocalizationService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Title } from '@angular/platform-browser';
import { HostWalletDto } from '@proxy/host-wallets';

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
  walletBalance: number;
  confirmedAmounts: number;
  lang: any;

  constructor(
    private service: HostWalletsService,
    private localizationService: LocalizationService,
    private toaster: ToasterService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.lang = this.localizationService.currentLang;
    this.titleService.setTitle(this.localizationService.instant('::Host:Title:hostWallets'));
    this.walletStatus = Object.keys(HostWalletStatus)
      .filter(key => !isNaN(Number(HostWalletStatus[key as keyof typeof HostWalletStatus])))
      .map(key => ({
        id: Number(HostWalletStatus[key as keyof typeof HostWalletStatus]),
        displayName: this.localizationService.instant(
          '::Enum:HostWalletStatus.' + Number(HostWalletStatus[key as keyof typeof HostWalletStatus]),
        ),
      }));
    this.getStatistic();
    this.getWallets(this.currentPage);
  }

  getStatistic() {
    this.service.getStatistic().subscribe(data => {
      this.walletBalance = data.walletBalance;
      this.confirmedAmounts = data.confirmedAmounts;
    });
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

    downloadReceipt(row: HostWalletDto) {
    if (!row.id) {
      return;
    }

    this.service.downloadTransferReceipt(row.id).subscribe((result: any) => {
      if (!result?.content) {
        return;
      }

      const bytes = this.base64ToBytes(result.content);
      const extension = this.detectFileExtension(bytes);
      const fileName = this.ensureFileExtension(
        row.transferReceiptFileName || result.name || 'transfer-receipt',
        extension
      );

      const blob = new Blob([bytes as unknown as BlobPart], {
        type: this.mimeTypeForExtension(extension),
      });
      this.downloadBlob(blob, fileName);
    });
  }

  private base64ToBytes(base64: string): Uint8Array {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Uint8Array(byteNumbers);
  }

  private detectFileExtension(bytes: Uint8Array): string {
    const signature = Array.from(bytes.slice(0, 4))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');

    if (signature.startsWith('89504e47')) return 'png';
    if (signature.startsWith('ffd8ff')) return 'jpg';
    if (signature.startsWith('47494638')) return 'gif';
    if (signature.startsWith('25504446')) return 'pdf';
    return '';
  }

  private ensureFileExtension(fileName: string, extension: string): string {
    if (!extension || /\.[a-zA-Z0-9]+$/.test(fileName)) {
      return fileName;
    }
    return `${fileName}.${extension}`;
  }

  private mimeTypeForExtension(extension: string): string {
    switch (extension) {
      case 'png':
        return 'image/png';
      case 'jpg':
        return 'image/jpeg';
      case 'gif':
        return 'image/gif';
      case 'pdf':
        return 'application/pdf';
      default:
        return 'application/octet-stream';
    }
  }

  private downloadBlob(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
