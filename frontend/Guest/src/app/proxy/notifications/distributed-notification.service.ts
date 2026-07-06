import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { NotificationType } from '../notificaitons/notification-type.enum';

@Injectable({
  providedIn: 'root',
})
export class DistributedNotificationService {
  apiName = 'Default';
  

  // sendEmail = (type: NotificationType, data: string, subjectData: string, toEmail: string, toName?: string, context?: any<string, string>, config?: Partial<Rest.Config>) =>
  //   this.restService.request<any, boolean>({
  //     method: 'POST',
  //     url: '/api/app/distributed-notification/send-email',
  //     params: { type, data, subjectData, toEmail, toName },
  //     body: context,
  //   },
  //   { apiName: this.apiName,...config });
  

  sendHtmlEmail = (data: string, toEmail: string, toName?: string, subject?: string, cancellationToken?: any, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/distributed-notification/send-html-email',
      params: { data, toEmail, toName, subject },
    },
    { apiName: this.apiName,...config });
  

  sendSMS = (type: NotificationType, data: string, toPhoneNumber: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/distributed-notification/send-sMS',
      params: { type, data, toPhoneNumber },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
