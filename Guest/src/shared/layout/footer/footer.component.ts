import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ContactUsComponent } from 'src/app/feature/contact-us/contact-us.component';
import { environment } from 'src/environments/environment';

import { DeviceDetectorService } from 'ngx-device-detector';
import { SessionStateService } from '@abp/ng.core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  deviceInfo:any
  year=new Date().getFullYear()
    lang = this.sessionState.getLanguage();

  constructor(private modalService: NzModalService,   
    private sessionState: SessionStateService,private deviceService: DeviceDetectorService)
  {}
  ngOnInit(): void {
    this.epicFunction()
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  loginToHost() {
    let url = environment.hostUrl + '/auth/login?no-email';
    window.location.href = url;
  }
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }
  wattsApp() {
    let href;
    if (this.deviceInfo && this.deviceInfo.device == 'iPhone') {
      return window.open('https://wa.me/966507400207/?text=' + href, '_blank');
    } else {
      return window.open(
        'https://api.whatsapp.com/send?phone=966507400207&text=' + href,
        '_blank'
      );
    }
  }
  contact(){
    window.scroll(0,0)
    this.modalService.create({
    nzFooter: null,
    nzWidth:700,
    nzClassName:'rounded-xl',
    nzContent: ContactUsComponent
  });}


  openNewWindow(url: string) {
    window.open(url, '_blank');
  }
}
