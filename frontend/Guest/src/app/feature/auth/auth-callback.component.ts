import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-auth-callback',
  template: `<p>جارٍ تسجيل الدخول...</p>`,
})
export class AuthCallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   const code = params['code'];
    //   const state = params['state'];
    //   const iss = params['iss'];

    //   console.log('📥 Received code:', code);
    //   console.log('📥 Received state:', state);
    //   console.log('📥 Received iss:', iss);

    //   if (code && state) {
    //     this.exchangeCodeForToken(code, state, iss);
    //   } else {
    //     this.router.navigate(['/error']); // أو صفحة خطأ مناسبة
    //   }
    // });
  }

  exchangeCodeForToken(code: string, state: string, iss?: string) {
    // ⬇️ أرسل الكود للباكند أو endpoint التوكن الخاص بك
    // مثال:
    // this.authService.exchangeToken(code, state).subscribe(...)

    // بعد الانتهاء، مثلاً:
    this.router.navigate(['/'], {
      queryParams: { lang: 'ar' },
      replaceUrl: true,
    });
  }
}
