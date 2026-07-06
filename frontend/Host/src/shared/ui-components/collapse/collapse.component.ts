import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapse',

  templateUrl: './collapse.component.html',
  styleUrl: './collapse.component.scss',
})
export class CollapseComponent {
  @Input() title: string = '';
  isCollapse: boolean = true;
}
