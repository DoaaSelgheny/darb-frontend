import { mapEnumToOptions } from '@abp/ng.core';

export enum HostWalletStatus {
  InWallet = 1,
  AwaitingHostConfirmation = 2,
  Confirmed = 3,
}

export const hostWalletStatusOptions = mapEnumToOptions(HostWalletStatus);
