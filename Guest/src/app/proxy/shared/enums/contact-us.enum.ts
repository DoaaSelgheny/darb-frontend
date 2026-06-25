import { mapEnumToOptions } from '@abp/ng.core';

export enum ContactUs {
  Complaint = 1,
  Suggestion = 2,
  Question = 3,
  Other = 4,
}

export const contactUsOptions = mapEnumToOptions(ContactUs);
