import { LocalizationService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingsHostService } from '@proxy/ratings/ratings-host.service';
import { ServiceType } from '@proxy/ratings/service-type.enum';
import { SharedModule } from 'src/shared/shared.module';

@Component({
  selector: 'app-rating-details',
  standalone: true,
  imports: [SharedModule,CommonModule,],
  templateUrl: './rating-details.component.html',
  styleUrl: './rating-details.component.scss'
})
export class RatingDetailsComponent implements OnInit  {
 id: number;
  data = null;
  serviceType=ServiceType;
  copied=false
  lang;
  replyText=null;
  constructor(
    private service: RatingsHostService,
    private route: ActivatedRoute,
    private localizationService: LocalizationService,
    private titleService: Title
  ) {
    this.id = +this.route.snapshot.params['id'];

  }
  ngOnInit(): void {
    this.lang = this.localizationService.currentLang;
    this.titleService.setTitle(this.localizationService.instant('::Host:Title:ratingDetails'));
    this.service.getRatingDetailsById(this.id).subscribe(x => {
      this.data = x;
    });
  }

  copyToClipboard(number:any)
  {
    navigator.clipboard.writeText(number).then(
      () => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000); // Reset after 2 seconds
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  }
  reply()
  {
    this.service.reply(this.id,this.replyText).subscribe(x => {
      this.service.getRatingDetailsById(this.id).subscribe(x => {
        this.data = x;
      });
    });
  }
}
