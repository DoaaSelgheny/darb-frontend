import { Component, inject, Input, OnInit } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-modal-confirm-data',
  standalone: true,
  imports: [],
  templateUrl: './modal-confirm-data.component.html',
  styleUrl: './modal-confirm-data.component.scss'
})
export class ModalConfirmDataComponent implements OnInit{

  readonly nzModalData = inject(NZ_MODAL_DATA);
  reason: string;
  img:string

  ngOnInit(): void {
    this.reason = this.nzModalData.reason;
    this.img = this.nzModalData.img
  }
}
