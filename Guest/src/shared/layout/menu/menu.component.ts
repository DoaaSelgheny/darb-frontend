import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NavigationEnd, Router} from '@angular/router';
import { AuthService, LocalizationService, SessionStateService } from '@abp/ng.core';
import { environment } from 'src/environments/environment';
import { ConfigurationService } from '../header/configuration/configuration.service';
import { ContactUsComponent } from 'src/app/feature/contact-us/contact-us.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() openMenu: boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  isVisibleSwitchToHost: boolean = false;
  @Input() isHost:boolean
  constructor(
    private router: Router,
    public authService: AuthService,
    private sessionState: SessionStateService,
    private modalService: NzModalService,
    private configurationService: ConfigurationService,
  ) {
    const lang = this.sessionState.getLanguage();
    if(!this.isHost){

      lang == 'en' ? (this.menu = this.menuEn) : (this.menu = this.menuAr);
    }else{
      lang == 'en' ? (this.menu = this.menuHostEn) : (this.menu = this.menuHostAr);

    }
  }
  menu = [];

  ngOnInit(): void {
    this.updateMenuSelection(this.router.url);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateMenuSelection(event.url);
      }
    });
  }

  updateMenuSelection(url: string) {
    this.menu.forEach(menu => {
      const isSelected = menu.path === url;
      if (isSelected) {
        menu.selected = isSelected;
      }
    });
  }

  logOut() {
    this.authService.logout();
      this.router.navigate(['/'], { onSameUrlNavigation: 'reload' });
  }
 menuAr = [
    {
      name: 'الرئيسية',
      path: '/',
      selected: false,
    },
    {
      name: 'عن حياك',
      path: '/about-hyyak',
      selected: false,
    },
    {
      name: 'بيوت العطلات',
      path: 'tab1',
      selected: false,
    },
    {
      name: 'التجارب',
      path: 'tab2',
      selected: false,
    },
    {
      name: 'حيّاك للأعمال',
      path: '/hyyak-business',
      selected: false,
    },
    {
      name: 'الأسئلة الشائعة',
      path: '/faq',
      selected: false,
    },
    {
      name: 'اتصل بنا',
      path: 'contact',
      selected: false,
    },
  ];
  menuEn = [
    {
      name: 'Home',
      path: '/',
      selected: false,
    },
    {
      name: 'Vacation home',
      path: 'tab1',
      selected: false,
    },
    {
      name: 'Experience',
      path: 'tab2',
      selected: false,
    },
    {
      name: ' About Hyyak  ',
      path: '/about-hyyak',
      selected: false,
    },
    {
      name: 'Hayyak Business',
      path: '/hyyak-business',
      selected: false,
    },
    {
      name: 'Questions Answers',
      path: '/faq',
      selected: false,
    },
    {
      name: 'Contact us',
      path: 'contact',
      selected: false,
    },
  ];

  menuHostEn = [
    {
      name: 'Guests',
      path: '/about-hyyak',
      selected: false,
    },
    {
      name: 'Hayyak Business',
      path: '/hyyak-business',
      selected: false,
    },
  ];
  menuHostAr = [
    {
      name: 'الضيوف',
      path: '/about-hyyak',
      selected: false,
    },
    {
      name: 'حيّاك للأعمال',
      path: '/hyyak-business',
      selected: false,
    },
  ];
  goToPath(path: string) {
    if (path === 'tab1') {
      this.router.navigate(['/explore',{type:1}])
    } else if (path === 'tab2') {
      this.router.navigate(['/explore',{type:2}])

    } else if (path === 'contact') {
      this.modalService.create({
        nzFooter: null,
        nzWidth: 700,
        nzClassName: 'rounded-xl',
        nzContent: ContactUsComponent,
      });
    } else {
      this.router.navigate([path]);
    }
  }

  loginToHost() {
    this.configurationService.isAllowSwitchToHost().subscribe(data => {
      if (data) {
        let url = environment.hostUrl + '/auth/login';
        window.location.href = url;
      } else {
        this.isVisibleSwitchToHost = true;
}
});
}
}
