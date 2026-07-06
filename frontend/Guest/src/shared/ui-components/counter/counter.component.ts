import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() subLabel: string = '';
  @Input() @Output() value = 1;
  @Input() maxValue:number = 1000;
  @Output() changeEvent = new EventEmitter<number>();
  @Input() minVal:number = 0;
  @Input() disabled:boolean = false;
 
  increment() {
    if(this.value < this.maxValue){

      this.value++;

      this.changeEvent.emit(this.value);
    }
  }
  decrement() {
    if (this.value > this.minVal) {
      this.value--;
      this.changeEvent.emit(this.value);
    }

  }
}
