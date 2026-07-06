import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceWithNavigationPropertiesDto, ExperienceGuestService } from '@proxy/experiences';
import { RatingsGuestService, ServiceType } from '@proxy/ratings';
import { VacationHomeWithNavigationPropertiesDto, VacationHomeGuestService } from '@proxy/vacation-homes';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RatingComponent } from '../reservation/components/rating/rating.component';
import { ReservationType } from '@proxy/reservation-users';
import { ConfigStateService, LocalizationService } from '@abp/ng.core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') heroCanvasRef: ElementRef<HTMLCanvasElement>;
  private heroCanvasCtx: CanvasRenderingContext2D;
  private heroCanvasAnimationId: number;
  private heroCanvasDrift = 0;
  private readonly heroCanvasResizeListener = () => this.resizeHeroCanvas();

  filterObject: any = null;
  vacationHomes: VacationHomeWithNavigationPropertiesDto[];
  experiences: ExperienceWithNavigationPropertiesDto[];
  mergedArray=[]
  reserveType = ServiceType
  lang = this.localizationService.currentLang;
  currentUser: any;
  constructor(
    private vacationHomeService: VacationHomeGuestService,
    private experienceService: ExperienceGuestService,
    private ratingService:RatingsGuestService,
    private modalService: NzModalService,
    private localizationService: LocalizationService,
    private router: Router,
    private config: ConfigStateService,

  ) {
    this.currentUser = this.config.getOne('currentUser');

  }
  ngOnInit(): void {  
      
    if (this.currentUser.isAuthenticated) {

      this.getReservationIdForRating();
    }
    this.getExploreData();
    
  
  }
  getReservationIdForRating(){
    this.ratingService.getReservationIdForRating().subscribe({
      next:next=>{
        if(next.reservationId){
          if(next.serviceType === this.reserveType.VacationHome){

            let data = {
              id:next.reservationId,
              reservationType:next.serviceType,
              vacationHomeName:next.name,
              image:next.img,
              city:{name:next.city},
              district:{name:next.district},
              ratingsAverage:next.ratingsAverage,
              ratingsCount:next.ratingsCount
            }
            const modal = this.modalService.create({
              nzFooter: null,
              nzWidth: 700,
              nzClassName: 'rounded-xl',
              nzContent: RatingComponent,
              nzData:{item:data}
            });
          }else{
            let data = {
              id:next.reservationId,
              reservationType:next.serviceType,
              experienceName:next.name,
              image:next.img,
              city:{name:next.city},
              district:{name:next.district},
              ratingsAverage:next.ratingsAverage,
              ratingsCount:next.ratingsCount
            }
            const modal = this.modalService.create({
              nzFooter: null,
              nzWidth: 700,
              nzClassName: 'rounded-xl',
              nzContent: RatingComponent,
              nzData:{item:data}
            });
          }
        }
      }
    })
  }
  
  getExploreData(){
    this.vacationHomeService
    .getList({
      maxResultCount: 10,
      cityIds: null,
      vacationHomeTypeIds: null,
      showOnHome:true,
      sorting:'Random'

    })
    .subscribe({
      next: data => {
        this.vacationHomes = data.items;
        this.experienceService
        .getList({
          maxResultCount: 10,
          cityIds: null,
          experienceTypeIds: null,
          showOnHome:true,
          sorting:'Random'
        })
        .subscribe({
          next: data => {
            this.experiences = data.items;
            this.vacationHomes = [...this.vacationHomes.map(item => ({ ...item, isExperience: false }))]
            this.experiences = [
              ...this.experiences.map(item => ({ ...item, isExperience: true }))
            ];
            this.mergeArray()
          },
        });
      },
    });
  }
  mergeArray() {
    const maxLength = Math.max(this.vacationHomes?.length, this.experiences?.length);
    const result = [];
    for (let i = 0; i < maxLength; i++) {
      if (i < this.vacationHomes.length) {
        result.push(this.vacationHomes[i]);
      }
      if (i < this.experiences.length) {
        result.push(this.experiences[i]);
      }
    }
      this.mergedArray = result;
  }
  explore() {
    this.router.navigate(['/explore']);
  }

  changeFilter($event) {
    this.filterObject = $event;
  }
  ngAfterViewChecked(): void {
    if (localStorage.getItem('reserveUrl')) {
    window.location.href=(localStorage.getItem('reserveUrl'))
    }
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.

  }

  ngAfterViewInit(): void {
    this.initHeroCanvas();
  }

  ngOnDestroy(): void {
    if (this.heroCanvasAnimationId) {
      cancelAnimationFrame(this.heroCanvasAnimationId);
    }
    window.removeEventListener('resize', this.heroCanvasResizeListener);
  }

  private initHeroCanvas(): void {
    const canvas = this.heroCanvasRef?.nativeElement;
    if (!canvas) return;
    this.heroCanvasCtx = canvas.getContext('2d');
    this.resizeHeroCanvas();
    window.addEventListener('resize', this.heroCanvasResizeListener);
    this.drawHeroCanvasFrame();
  }

  private resizeHeroCanvas(): void {
    const canvas = this.heroCanvasRef?.nativeElement;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }

  private drawStar8(cx: number, cy: number, outerRadius: number, innerRadius: number): void {
    const ctx = this.heroCanvasCtx;
    ctx.beginPath();
    for (let i = 0; i < 16; i++) {
      const angle = (i * Math.PI) / 8 - Math.PI / 2;
      const radius = i % 2 ? innerRadius : outerRadius;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.closePath();
  }

  private drawHeroCanvasFrame = (): void => {
    const canvas = this.heroCanvasRef?.nativeElement;
    const ctx = this.heroCanvasCtx;
    if (!canvas || !ctx) return;

    const cell = 88;
    const outerRadius = cell * 0.35;
    const innerRadius = cell * 0.146;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    this.heroCanvasDrift = (this.heroCanvasDrift + 0.28) % cell;

    const cols = Math.ceil(width / cell) + 3;
    const rows = Math.ceil(height / cell) + 3;

    for (let row = -2; row < rows; row++) {
      for (let col = -2; col < cols; col++) {
        const cx = col * cell + cell / 2;
        const cy = row * cell + cell / 2 - this.heroCanvasDrift;

        this.drawStar8(cx, cy, outerRadius, innerRadius);
        ctx.strokeStyle = 'rgba(11,122,117,0.32)';
        ctx.lineWidth = 0.85;
        ctx.stroke();

        if (((row * 3) ^ (col * 5)) % 11 === 0) {
          ctx.beginPath();
          ctx.arc(cx, cy, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(212,165,90,0.38)';
          ctx.fill();
        }
      }
    }

    for (let row = -2; row < rows; row++) {
      for (let col = -2; col < cols; col++) {
        const jx = col * cell;
        const jy = row * cell - this.heroCanvasDrift;
        ctx.save();
        ctx.translate(jx, jy);
        ctx.rotate(Math.PI / 4);
        const s = cell * 0.088;
        ctx.strokeStyle = 'rgba(212,165,90,0.1)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(-s, -s, s * 2, s * 2);
        ctx.restore();
      }
    }

    this.heroCanvasAnimationId = requestAnimationFrame(this.drawHeroCanvasFrame);
  };
}
