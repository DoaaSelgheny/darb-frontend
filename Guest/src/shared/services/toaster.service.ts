import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  messageId: string;
  constructor(private message: NzMessageService) {}

  success(message: string) {
    // <i (click)="close()" class="fa-solid fa-xmark text-xl cursor-pointer text-[#1B998B]" ></i>
    this.message.success(
      `<div class="success-message min-w-[492px] border border-[#1B998B] bg-[#E4FDFB] p-4 flex items-center justify-between">
      <div class="flex items-center">
      <img class=" me-2.5" src="assets/icons/check-icon.svg">
      <p class="text-[#1B998B] text-start">${message}</p>
      </div>

    </div>`,
      { nzDuration: 3000 },
    );
  }

  error(message: string) {
    this.message.error(
      `<div class="success-message min-w-[492px] border border-[#EC4A4A] bg-[#FFF0F6] p-4 flex items-center justify-between">
      <div class="flex items-center">
      <img class=" me-2.5" src="assets/icons/wrong-icon.svg">
      <p class="text-[#EC4A4A] text-start">${message}</p>
      </div>

    </div>`,
      { nzDuration: 3000 },
    );
  }

  info(message: string) {
    this.message.info(
      `<div class="success-message min-w-[492px] border border-[#2E97EF] bg-[#EAF5FD] p-4 flex items-center justify-between">
      <div class="flex items-center">
      <img class=" me-2.5" src="assets/icons/info-icon.svg">
      <p class="text-[#2E97EF] text-start">${message}</p>
      </div>

    </div>`,
      { nzDuration: 3000 },
    );
  }

  warning(message: string) {
    this.message.warning(
      `<div class="success-message min-w-[492px] border border-[#FFA072] bg-[#FFF0F6] p-4 flex items-center justify-between">
      <div class="flex items-center">
      <img class=" me-2.5" src="assets/icons/warning.svg">
      <p class="text-[#FFA072] text-start">${message}</p>
      </div>

    </div>`,
      { nzDuration: 3000 },
    );
  }
}
