import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CityDto } from '@proxy/cities';
import { ExperienceTypeDto } from '@proxy/experience-types';
import { LookupDto } from '@proxy/shared';
import { ExperienceDto, ExperienceHostService, ExperienceStatus, ExperienceWithNavigationPropertiesDto } from '@proxy/experiences';
import { MeanDto } from '@proxy/means';
import { ExperienceImageDto } from '@proxy/experience-images';
import { TosterService } from 'src/shared/services/toster.service';
import { SessionStateService, isArray } from '@abp/ng.core';
import { ConfrontationTypes } from 'src/shared/ui-components/confrontation-popup/confrontation-types.enum';
import { HostSettingService } from '@proxy/host-settings';
import {
  arrayMinLengthValidator,
  moneyValidator,
  noWhitespaceOnlyValidator,
  requiredUploadValidator,
} from 'src/shared/directives/custom-validation';

@Component({
  selector: 'app-experiment-add-edit',
  templateUrl: './experiment-add-edit.component.html',
  styleUrl: './experiment-add-edit.component.scss',
})
export class ExperimentAddEditComponent {
  id?: number = null;
  isVisible: boolean = false;
  isVisibleSuccess: boolean = false;
  loadingData = {};
  loading: boolean = false;
  currentCity: CityDto = null;
  isVisibleSaveAndExit: boolean = false;
  isVisiblePublishExit: boolean = false;
  confrontationTypesEnum = ConfrontationTypes;
  lang = this.sessionState.getLanguage();

  constructor(
    private service: ExperienceHostService,
    private router: Router,
    private route: ActivatedRoute,
    private hostSettingService: HostSettingService,
    private toaster: TosterService,
    private sessionState: SessionStateService,
  ) {
    router.events.subscribe(event => {
      let ev: any = event;
      if (ev?.routerEvent && ev.url === ev.urlAfterRedirects) {
        this.currentStep = Number(sessionStorage.getItem('currentStep')) || 0;
      }
    });

  }
  steps: number = 8;
  currentStep: number = 0;

  experience: ExperienceDto;
  meanIds: number[] = [];
  experienceImages: ExperienceImageDto[] = [];

  cities: CityDto[] = [];
  experienceTypes: ExperienceTypeDto[] = [];
  cancellationAndReturnPolicies: LookupDto<number>[] = [];
  experienceReservationTypes: LookupDto<number>[] = [];
  experienceReservationWays: LookupDto<number>[] = [];
  means: MeanDto[] = [];

  form: FormGroup = new FormGroup({
    step1: new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required, noWhitespaceOnlyValidator()]),
      // cityId: new FormControl(null, Validators.required),
      experienceTypeId: new FormControl(null, Validators.required),
    }),
    step2: new FormGroup({
      district: new FormControl(null, [Validators.required, noWhitespaceOnlyValidator()]),
      lng: new FormControl(null, Validators.required),
      lat: new FormControl(null, Validators.required),
    }),
    step3: new FormGroup({
      description: new FormControl(null, [Validators.required, noWhitespaceOnlyValidator()]),
      moreDetails: new FormControl(null, [Validators.required, noWhitespaceOnlyValidator()]),
    }),
    step4: new FormGroup({
      meanIds: new FormArray([], [arrayMinLengthValidator(1)]),
    }),
    step5: new FormGroup({
      primaryImages: new FormArray([], [requiredUploadValidator]),
      experienceImages: new FormArray([], [requiredUploadValidator]),
    }),
    step6: new FormGroup({
      experienceReservationType: new FormControl(1),
      adultPrice: new FormControl(null),
      childPrice: new FormControl(null),
      minNumberOfAdults: new FormControl(1),
      maxNumberOfAdults: new FormControl(1),
      minNumberOfChildren: new FormControl(0),
      maxNumberOfChildren: new FormControl(0),
      numberOfHours: new FormControl(0),
      numberOfDays: new FormControl(0),
    }),
    step7: new FormGroup({
      basicPrice: new FormControl(null, [Validators.required, moneyValidator]),
      experienceReservationWay: new FormControl(null),
      cancellationAndReturnPolicyId: new FormControl(null, Validators.required),
    }),
    step8: new FormGroup({
      availableFrom: new FormControl(null),
      availableTo: new FormControl(null),
      checkInTime: new FormControl(null),
      checkOutTime: new FormControl(null),
      isAvailableAllYear: new FormControl(null),
    }),
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if(this.id){

      this.GetData(this.id,true)
    }
    this.getLookupData();
  }
  //get data by Id
  private GetData(id: any, firstLoad: boolean = false) {
    this.service.getWithNavigationProperties(Number(id)).subscribe((data: any) => {
      this.experience = data.experience;
      if(this.experience.experienceStatus===ExperienceStatus.UnderReview)
      {
        this.router.navigate(['/experiments/view-experiment',id]);
      }
      if (firstLoad) {
        this.currentStep = this.experience.currentStep ? this.experience.currentStep-1  : 0;
     if(this.currentStep===0)
     {
      this.currentStep=1
     }
     if(this.experience.currentStep===7 && this.experience.experienceStatus===ExperienceStatus.Published)
     {
      this.currentStep=0
     }
      }

      // let navigatedStep = localStorage.getItem('currentStep');
      // if (navigatedStep) {
      //   this.currentStep = Number(navigatedStep);
      // }
    });
  }
  goNext(step:string){
    this.currentStep = Number(step);
    this.saveCurrentStep();
  }

  //save step
  private saveCurrentStep() {
    //debugger
    this.GetData(this.id.toString());
    // sessionStorage.setItem('currentStep', this.currentStep.toString());
  }

  //////////////past
  getData(id: number) {
    this.setLoading({ data: true });
    // this.service.get(id).subscribe({
    //   next: data => {
    //     this.experience = data;
    //     // this.meanIds = data.experience?.meanIds ?? [];
    //     // this.experienceImages = data.experience?.experienceImages ?? [];

    //     for (let i = 1; i <= this.steps; i++) {
    //       this.setValueToFormGroup(this.form.get(`step${i}`) as FormGroup, data.experience);
    //     }
    //   },
    //   complete: () => {
    //     this.setLoading({ data: false });
    //   },
    // });
  }

  getLookupData() {
    this.setLoading({ city: true });
    this.service.getCityLookup().subscribe({
      next: data => {
        this.cities = data;
      },
      complete: () => {
        this.setLoading({ city: false });
      },
    });

    this.setLoading({ refundTypes: true });
    this.service.getCancellationAndReturnPolicyLookup({ maxResultCount: 1000 }).subscribe({
      next: (data: any) => {
        this.cancellationAndReturnPolicies = data;
      },
      complete: () => {
        this.setLoading({ refundTypes: false });
      },
    });

    this.setLoading({ experienceType: true });
    this.service.getExperienceTypeLookup().subscribe({
      next: data => {
        this.experienceTypes = data;
      },
      complete: () => {
        this.setLoading({ experienceType: false });
      },
    });

    this.setLoading({ means: true });
    this.service.getMeanLookup().subscribe({
      next: data => {
        this.means = data;
      },
      complete: () => {
        this.setLoading({ means: false });
      },
    });

    this.setLoading({ reservationType: true });
    this.service.getExperienceReservationTypeLookup().subscribe({
      next: (data: any) => {
        this.experienceReservationTypes = data;
      },
      complete: () => {
        this.setLoading({ reservationType: false });
      },
    });

    this.setLoading({ reservationWay: true });
    this.service.getExperienceReservationWayLookup().subscribe({
      next: (data: any) => {
        this.experienceReservationWays = data;
      },
      complete: () => {
        this.setLoading({ reservationWay: false });
      },
    });
  }

  // goNext() {
  //   if (!this.validateCurrentPage()) {
  //     this.makeFormAsMarkAdDirty();
  //     return;
  //   }
  //   if (this.currentStep >= this.steps) return;

  //   if (this.currentStep == 1) {
  //     const cityId = this.form?.get('step1')?.value?.['cityId'];
  //     this.currentCity = this.cities.find(x => x.id == cityId);
  //   }
  //   this.getCurrentSaveAction().subscribe(data => {
  //     this.id = data.id;
  //     this.currentStep++;
  //   });
  // }

  goBack() {
    if (this.currentStep <= 1) return;
    this.currentStep--;
  }

  makeFormAsMarkAdDirty() {
    ////debugger;
    Object.keys(this.getCurrentGroup().controls).forEach(key => {
      var controls = this.getCurrentGroup().get(key);
      if (controls instanceof FormControl) {
        ////debugger;

        controls.markAsDirty();
        if (!controls.valid) {
          if (key === 'lat') this.toaster.error('من فضلك اختر المكان المنشأه علي الخريطه ');
        }
      } else if (controls instanceof FormArray) {
        if (key === 'primaryImages') this.toaster.error('من فضلك قم برفع علي الاقل صوره ');

        if (key === 'experienceImages')
          this.toaster.error('من فضلك قم باختيار وسائل الراحة الأساسية / ثانويه');

        if (key === 'meanIds') this.toaster.error('من فضلك قم باختيار وسائل الراحة / المشمولة');
      }
    });
  }

  getCurrentSaveAction() {
    const val = {
      id: this.id,
      ...this.getCurrentGroup().value,
    };
    switch (this.currentStep) {
      case 1:
        return this.service.saveStep1ByInput(val);
      case 2:
        return this.service.saveStep2ByInput(val);
      case 3:
        return this.service.saveStep3ByInput(val);
      case 4:
        return this.service.saveStep4ByInput(val);
      case 5:
        return this.service.saveStep5ByInput(val);
      case 6:
        return this.service.saveStep6ByInput(val);
      case 7:
        // return this.service.saveStep7ByInput(val);
      case 8:
        // return this.service.saveStep8ByInput(val);
    }
  }

  getCurrentGroup(): FormGroup | null {
    const groupName = `step${this.currentStep}`;
    const group = this.form?.get(groupName);

    // Check if the retrieved form group is indeed a FormGroup
    if (group instanceof FormGroup) {
      return group;
    } else {
      // Log an error or handle the case where the group is not found or not a FormGroup
      return null;
    }
  }

  validateCurrentPage(): boolean {
    return this.getCurrentGroup()?.valid;
  }

  saveAndExit() {
    ////debugger;
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }
    const value = this.getModel();
    this.getCurrentSaveAction().subscribe(x => {
      this.toaster.success('تم حفظ البيانات بنجاح');
      this.router.navigate(['/experiments']);
    });
  }

  async publish() {
    const value = this.getModel();
    this.isVisiblePublishExit = false;
    this.service.publishExperienceById(value.id).subscribe(x => {
      this.isVisibleSuccess = true;
    });
  }

  getModel() {
    // if (this.experience?.images && this.vacationHome?.images.length > 0) {
    //   this.vacationHome.images[0].isPrimary = true;
    // }
    this.form.value.step1.id == null
      ? (this.form.value.step1.id = this.id)
      : this.form.value.step1.id;
    const formValues = this.form.value;
    const model = {
      id: this.experience?.id,
      ...formValues['step1'],
      ...formValues['step2'],
      ...formValues['step3'],
      ...formValues['step4'],
      ...formValues['step5'],
      ...formValues['step6'],
      ...formValues['step7'],
      ...formValues['step8'],
    };
    return model;
  }

  setValueToFormGroup(form: FormGroup, data: any) {
    if (!form?.controls) return;
    for (let key in form.controls) {
      if ((form.controls[key] as any)?.controls) {
        if (isArray(data[key]))
          data[key].forEach(val => {
            (form.controls[key] as FormArray).controls.push(new FormControl(val));
          });
      } else {
        form.controls[key].setValue(data[key]);
      }
    }
  }

  setLoading(obj: any) {
    for (let key of Object.keys(obj)) {
      this.loadingData[key] = obj[key];
    }
    this.loading = Object.values(this.loadingData).some(x => x == true);
  }

  handleCityChage(city: CityDto) {
    this.currentCity = city;
  }
  ngOnDestroy(): void {
    sessionStorage.removeItem('currentStep');
    localStorage.removeItem(this.experience?.id?.toString() ?? '');
  }
}
