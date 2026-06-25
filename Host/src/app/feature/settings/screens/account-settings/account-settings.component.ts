import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss',
})
export class AccountSettingsComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.handelForm();
  }

  handelForm() {
    this.form = this.fb.group({
      name: this.fb.control('بريق أحمد مصطفي', Validators.required),
      email: this.fb.control('barieq@gmail.com', Validators.required),
      phone: this.fb.control('553648109', Validators.required),
    });

    this.form.get('name')?.disable();
    this.form.get('email')?.disable();
    this.form.get('phone')?.disable();
  }
}
