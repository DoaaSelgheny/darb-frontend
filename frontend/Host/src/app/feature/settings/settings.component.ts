import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  settings = [
    // {
    //   name: 'أعدادات الحساب',
    //   select: false,
    //   path: 'account-settings',
    // },
    {
      name: 'الحجوزات',
      select: true,
      path: 'reservation-settings',
    },
    // {
    //   name: 'اسعار الخدمات',
    //   select: false,
    //   path: 'service-prices-settings'
    // },
    // {
    //   name: 'التقويم',
    //   select: false,
    //   path: 'reservation-settings'
    // },
    // {
    //   name: 'المعاملات المالية',
    //   select: false,
    //   path: 'reservation-settings'
    // }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.handelSelectCurrentPage();
  }

  selectItem(item: any) {
    const currentSelected = this.settings.find(item => !!item.select);
    currentSelected!.select = false;
    item.select = true;
    this.router.navigate(['../' + item.path], { relativeTo: this.route.firstChild });
  }

  handelSelectCurrentPage() {
    const item = this.settings.find(item => this.router.url.endsWith(item.path));
    item!.select = true;
  }
}
