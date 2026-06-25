import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 form: FormGroup;
   constructor(
        private fb: FormBuilder,
   ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
   
      firstName: this.fb.control('', [Validators.required]),
      lastName:this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      captcha: this.fb.control(null, [Validators.required]),
    });
      
  }
  resolved(captchaResponse: string) {
    if (captchaResponse) this.form.controls['captcha'].setValue(captchaResponse);
    else this.form.controls['captcha'].setValue(null);
  }
}
