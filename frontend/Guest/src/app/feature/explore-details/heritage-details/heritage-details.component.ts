import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { heritage } from './heritage-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heritage-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heritage-details.component.html',
  styleUrl: './heritage-details.component.scss'
})
export class HeritageDetailsComponent {

  place: any;

  route=inject(ActivatedRoute)

  ngOnInit(){

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.place = heritage.find(x => x.id === id);

  }

}
