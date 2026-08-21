import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {  LocalizationService } from '@abp/ng.core';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  lang=this.localizationService.currentLang;
  @Input() openMenu: boolean = false;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router,
    private localizationService:LocalizationService
  ) {}
  ngOnInit(): void {
    this.updateMenuSelection(this.router.url);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateMenuSelection(event.url);
      }
    });
  }
  // TODO replace /coming-soon with the actual link
  menu = [
    {
      // name: this.lang=='ar'?'القائمة الرئيسية':'Menu',
      list: [
//         {

//           path: '/yproducts',
//           name: ' Y Dev Project',
//           icon: 'fa-solid fa-apple-whole',
//           selected: false,
//           comingSoon: false,
//           isYdev:true
//         },
        // {
        //   path: null,///coming-soon
        //   name: this.lang=='ar'?'لوحة المعلومات':'Dashboard',
        //   icon: 'fa-regular fa-house-chimney',
        //   selected: false,
        //   comingSoon: true,
        // },
        {
          path: '/holiday-homes',
          name:this.lang=='ar'?'بيوت العطلات':'Vacation-Homes',
          icon: "fa-solid fa-building-user",
          selected: false,
        },
        {
          path: '/experiments',
          name: this.lang=='ar'?'التجارب':'Experiences',

          icon: 'fa-solid fa-clipboard-list',
          selected: false,
        },
        // {

        //   path:'/financial-transactions',
        //   name: this.lang=='ar'?'المعاملات المالية':'Financial Transactions',
        //   icon: 'fa-solid fa-money-bill-transfer',
        //   selected: false,
        //   comingSoon: false,
        // },
        {

          path:'/host-wallets',
          name: this.lang=='ar'?'محافظ المضيفين':'Host Wallets',
          icon: 'fa-solid fa-wallet',
          selected: false,
          comingSoon: false,
        },
        {
          path: '/reservations',
          name: this.lang=='ar'?'الحجوزات':'Reservations',
          icon: 'fa-solid fa-pen-to-square',
          selected: false,
          comingSoon: false,
        },
        {
          path: '/rating',
          name: this.lang=='ar'?'التقييمات':'Ratings',
          icon: 'fa-regular fa-star',
          selected: false,
          comingSoon: false,
        },
        {
          path: '/calendar',
          name: this.lang=='ar'?'التقويم':'Calendar',
          icon: 'fa-regular fa-calendar',
          selected: false,
          comingSoon: false,
        },


//     {
//       name: this.lang=='ar'?'الاعدادات':'Settings',
//       list: [
//         {
//           path: '/coming-soon',
//           name: this.lang=='ar'?'المحادثات مع العملاء':'Conversations',
//           icon: 'fa-regular fa-messages',
//           selected: false,
//           comingSoon: true,
//         },
//         {
//           path: '/contact-us',
//           name: this.lang=='ar'?'تواصل مع فريق حياك':'Contact Hyyak',
//           icon: 'fa-regular fa-headset',
//           selected: false,
//         },
//         {
//           path: '/settings',
//           name: this.lang=='ar'?'الإعدادات':'Settings',
//           icon: 'fa-regular fa-gear',
//           selected: false,
//         },
//         {
//           path: '/coming-soon',
//           name: this.lang=='ar'?'الضوابط والأحكام':'Policy and Control',
//           icon: 'fa-regular fa-toolbox',
//           selected: false,
//           comingSoon: true,
//         },
],
},
  ];

  updateMenuSelection(url: string) {
    this.menu.forEach(menu => {
      menu.list.forEach(child => {
        const isSelected = child.path === url;
        if (isSelected) {
          child.selected = isSelected;
        }
      });
    });
  }
}
