import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'app-guest-information',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './guest-information.component.html',
  styleUrl: './guest-information.component.scss',
})
export class GuestInformationComponent implements OnInit {
  @Input() data: any;
  mobile:any;
  ngOnInit(): void {
   this.mobile=this.data?.guest.phoneNumber.replace(/\s+/g, '')
  }
}
