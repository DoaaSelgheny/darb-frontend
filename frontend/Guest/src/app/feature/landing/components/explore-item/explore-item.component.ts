import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-explore-item',
  templateUrl: './explore-item.component.html',
  styleUrl: './explore-item.component.scss',
})
export class ExploreItemComponent {
  @Input() type: string;
  @Input() item: any;

  getImage() {
    return 'assets/imgs/bg-1.png'
    // this.type == 'vacationHome'
    //   ? this.item?.vacationHome?.primaryImage
    //   : this.item?.experience?.primaryImage;
  }
}
