import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { ViewHolidayHomeInformationComponent } from '../view-holiday-home-information/view-holiday-home-information.component';

@Component({
  selector: 'app-vew-holiday-home',
  standalone: true,
  imports: [ViewHolidayHomeInformationComponent, SharedModule],
  templateUrl: './view-holiday-home.component.html',
  styleUrl: './view-holiday-home.component.scss',
})
export class ViewHolidayHomeComponent implements OnInit {
  id?: number = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      if (Number(id) > 0) {
        this.id = Number(id);
        // todo if status is not allowed redirect to 404
      }
    }
  }
}
