import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';

@Component({
  selector: 'app-guest-information',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './guest-information.component.html',
  styleUrl: './guest-information.component.scss'
})
export class GuestInformationComponent implements OnInit {
  @Input() data: any;
  mobile:any;
  ngOnInit(): void {
   this.mobile=this.data?.host.phoneNumber.replace(/\s+/g, '')
  }
}
