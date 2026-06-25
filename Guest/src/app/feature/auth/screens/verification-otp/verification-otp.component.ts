import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verification-otp',
  templateUrl: './verification-otp.component.html',
  styleUrls: ['./verification-otp.component.scss'],
})
export class VerificationOtpComponent implements OnInit{
  form: FormGroup
constructor(    private formbuilder: FormBuilder,
){

}
  initForm() {
    this.form = this.formbuilder.group({
      email:[null, Validators.required],
      char1: [null, Validators.required],
      char2: [null, Validators.required],
      char3: [null, Validators.required],
      char4: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.initForm()
  }
  movetoNext(e: any) {
    if (e.srcElement.value != '') {
      e.preventDefault();
      let nextControl: any = e.srcElement.nextElementSibling;
      // Searching for next similar control to set it focus
      while (true) {
        if (nextControl) {
          if (nextControl.type === e.srcElement.type) {
            nextControl.focus();
            return;
          } else {
            nextControl = nextControl.nextElementSibling;
          }
        } else {
          return;
        }
      }
    }
  }
}
