import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { HostWalletStatus } from './host-wallet-status.enum';
import type { PaymentType } from '../reservation-users/payment-type.enum';

export interface HostWalletDto extends EntityDto<number> {
  hostId?: string;
  hostName?: string;
  reservationId: number;
  reservationNumber: number;
  amount: number;
  status: HostWalletStatus;
  paymentType: PaymentType;
  transferReceiptFileName?: string;
  transferReceiptUploadedAt?: string;
  transferredAt?: string;
  confirmedAt?: string;
  creationTime?: string;
  canInitiateTransfer: boolean;
  canConfirmTransfer: boolean;
  canDownloadTransferReceipt: boolean;
}

export interface HostWalletGetListInput extends PagedAndSortedResultRequestDto {
  status?: HostWalletStatus;
  filterText?: string;
}

export interface HostWalletStatisticDto {
  walletBalance: number;
  confirmedAmounts: number;
}

export interface InitiateHostWalletTransferInput {
  hostWalletId: number;
  transferReceiptFileName: string;
}
