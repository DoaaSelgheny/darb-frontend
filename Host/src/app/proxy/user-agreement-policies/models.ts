import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateUserAgreementPolicyDto {
  version: string;
  agreementText: string;
  effectiveDate?: string;
}

export interface UserAgreementPolicyDto extends EntityDto<number> {
  version?: string;
  agreementText?: string;
  effectiveDate?: string;
}
