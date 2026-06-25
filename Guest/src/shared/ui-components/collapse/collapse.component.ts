import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrl: './collapse.component.scss',
  animations: [
    trigger('collapse-animation', [
      state(
        'hide',
        style({
          display: 'none',
          opacity: '0',
        }),
      ),
      state(
        'show',
        style({
          display: 'block',
          opacity: '1',
        }),
      ),
      transition('hide => show', animate('300ms ease')),
      transition('show => hide', animate('300ms ease')),
    ]),
  ],
})
export class CollapseComponent {
  @Input() isActive = false;
  @Input() isDisabled = false;

  getState() {
    return this.isActive ? 'show' : 'hide';
  }
  toggleActive() {
    this.isActive = !this.isActive;
  }
}
