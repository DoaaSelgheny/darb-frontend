import {
  AuthService,
  ConfigStateService,
  LocalizationService,
  SessionStateService,
} from '@abp/ng.core';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { menu } from '../menu';
import { ProfileService } from 'src/app/feature/profile/profiles';
import { ConfigurationService } from './configuration/configuration.service';
import { ContactUsComponent } from 'src/app/feature/contact-us/contact-us.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { YakeenVerificationType } from '@proxy/account-verifications/enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerTransparent: boolean = false;
  menu = [];
  menuHost = [];
  isOpenMenu: boolean = false;
  currentUser: any;
  isShowSwitch: boolean = false;
  isVisibleSwitchToHost: boolean = false;
  isSiteLangauageArabic = true;
  profileData: any;
  yakeenVerificationType = YakeenVerificationType;
  @Input() isHost: boolean = true;
  lang = this.sessionState.getLanguage();
  @Output() scrollToSection: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionState: SessionStateService,
    public authService: AuthService,
    private config: ConfigStateService,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef,
    private configurationService: ConfigurationService,
    private localizationService: LocalizationService,

    private modalService: NzModalService,
  ) {
    this.lang == 'en' ? (this.menu = this.menuEn) : (this.menu = this.menuAr);
    this.lang == 'en' ? (this.menuHost = this.menuHostEn) : (this.menuHost = this.menuHostAr);

    this.router.events.subscribe(event => {
      this.headerTransparent = route.children[0]?.snapshot.data['headerTransparent'];
      if (event instanceof NavigationEnd) {
        this.isVisibleSwitchToHost = false;
      }
    });
    this.currentUser = this.config.getOne('currentUser');

    this.isShowSwitch = this.currentUser.phoneNumber?.startsWith('+966');
  }

  ngOnInit(): void {
    this.isSiteLangauageArabic = this.localizationService.currentLang == 'ar';

    if (this.currentUser.isAuthenticated) {
      this.profileService.getGuestProfile().subscribe(res => {
        this.profileData = res;
      });
    }
  }

  login() {
    this.authService.navigateToLogin();
  }
  logOut() {
    //Previously did nothing
    //Now it revokes the access/refresh token
    this.authService.logout();
    this.router.navigate(['/'], { onSameUrlNavigation: 'reload' });
  }
  linktoHome(id) {
    this.router.navigate(['/'], { onSameUrlNavigation: 'reload' });
    this.scrollToSection.emit(id);
  }

  loginToHost() {
    let url = environment.hostUrl + '/account-verification';
    window.location.href = url;
  }
  goToHost() {
    this.configurationService.isAllowSwitchToHost().subscribe(data => {
      if (data) {
        let url = environment.baseUrl + '/host-landing';
        window.location.href = url;
      } else {
        this.isVisibleSwitchToHost = true;
      }
    });
  }
  goToHostLanding() {
    this.router.navigate(['/host-landing']);
  }
  refresh() {
    window.location.reload();
  }
  menuAr = [
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
      path: '/',
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
      path: '/',
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
      // this.router.navigate(['/explore',{type:1}])
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/explore', { type: 1 }]);
      });
    } else if (path === 'tab2') {
      // this.router.navigate(['/explore',{type:2}])
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/explore', { type: 2 }]);
      });
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
}
