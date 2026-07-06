import type { EntityDto } from '@abp/ng.core';

export interface AgreedUserAgreementDto extends EntityDto<string> {
  userAgreementPolicyId: number;
  agreedDate?: string;
}

export interface CreateUpdateAgreedUserAgreementDto {
  userAgreementPolicyId: number;
  agreedDate: string;
}
