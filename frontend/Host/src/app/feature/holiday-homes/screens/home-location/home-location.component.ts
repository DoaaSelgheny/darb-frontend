import { isArray, LocalizationService, SessionStateService } from '@abp/ng.core';
import { HttpClient } from '@angular/common/http';
import {  Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { CityDto, CityService } from '@proxy/cities';
import {  DistrictService } from '@proxy/districts';
import { RegionLookupDto, RegionService } from '@proxy/regions';
import { VacationHomeHostService } from '@proxy/vacation-homes';
import { environment } from 'src/environments/environment';
import { vaidationType } from 'src/shared/directives/vaidationTypeEnum';
import { TosterService } from 'src/shared/services/toster.service';
// import { GoogleMapsService } from '@proxy/google-maps/google-maps.service';
declare var google: any;

@Component({
  selector: 'app-home-location',
  templateUrl: './home-location.component.html',
  styleUrl: './home-location.component.scss',
})
export class HomeLocationComponent implements OnInit,OnDestroy {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @Output() emitNext = new EventEmitter<string>();
  @Input() id:any
  @Input() vacationHome:any
  // @Input() regionId:number
  cities: CityDto[] = [];
  districts=[]

  center: google.maps.LatLngLiteral = { lat: 24, lng: 46 };
  display: google.maps.LatLngLiteral;

  markCenter: google.maps.LatLngLiteral = { lat: 24, lng: 46 };
  zoom = 12;
 validationTypeEnum = vaidationType;
  lang = this.sessionState.getLanguage();
  showStepModeButtons : boolean =false
  isVisibleSaveAndExit :boolean = false
  form = new FormGroup({
    id:new FormControl(null),
    // regionId: new FormControl(null, Validators.required),
    cityId: new FormControl(null, Validators.required),
    districtId: new FormControl(null, [Validators.required]),
    mapLink:new FormControl(null),
    lat:new FormControl(null),
    lng:new FormControl(null),
    isOwningMultipleUnits: new FormControl(false),
    unitNumber: new FormControl(null, [Validators.required]),
    unitFloor:new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
  })
  // regions:RegionLookupDto[]
  constructor(
    // private googleMapsService: GoogleMapsService,
    public holidayHomeService: VacationHomeHostService,
    public districtService:DistrictService,
    private http: HttpClient,
    private sessionState: SessionStateService,
    private router: Router,
      private toaster: TosterService,
      private route:ActivatedRoute,
      private localizationService: LocalizationService,
      private regionservice:RegionService,
      private cityserice:CityService


  ) {}

  ngOnInit(): void {
    // this.getRegionLookup()
    this.id =this.route.snapshot.paramMap.get('id')

    if(this.vacationHome){
      this.getCityLookUp()
      this.getDistrictsLookUp(this.vacationHome.cityId)
      this.setValueToFormGroup(this.form as FormGroup, this.vacationHome);
      this.form.patchValue({

      })
      this.form.get('mapLink').disable()
      const lat = this.form.value['lat'] ;
      const lng = this.form.value['lng'] ;

      if (lat > 0 && lng > 0) {
        this.center = { lat: lat, lng: lng };
        this.markCenter = { lat: lat, lng: lng };
      }
    }

  }
  // getRegionLookup() {
  //   this.regionservice.getRegionsByCountryId(this.vacationHome?.countryId).subscribe({
  //     next:next=>{
  //       this.regions = next
  //     }
  //   })

  // }
  getCityLookUp(){
    this.cityserice.getLookupByInput({ maxResultCount: 1000}).subscribe(data => {
      this.cities = data;
    });
    this.form.patchValue({
      cityId:null,
      districtId:null
    })

  }
  getDistrictsLookUp(cityIdd:number){
    this.districtService.getList({
      maxResultCount: 1000 ,
      cityId:cityIdd
    }).subscribe(data => {
      this.districts = data.items;
    });
    this.form.patchValue({
      districtId:null
    })
  }
  centerChanged() {
    const center = this.map.getCenter();
    this.markCenter = { lat: center.lat(), lng: center.lng() };
    this.form.patchValue({ lat: center.lat(), lng: center.lng() });
  }


//handle form data when get by id
setValueToFormGroup(form: FormGroup, data: any) {
  if (!form?.controls) return;
  //form.reset();
  for (let key in form.controls) {
    if (!!(form.controls[key] as any)?.controls) {
      if (isArray(data[key]))
        data[key].forEach(val => {
          (form.controls[key] as FormArray).controls.push(new FormControl(val));
        });
    } else {
      form.controls[key].setValue(data[key]);
    }
  }
}

  onCityChange(cityId: number) {


    if(cityId){

      const city = this.cities.find(x => x.id == cityId);
      const lat = city.lat;
      const lng = city.lng;

      if (lat > 0 && lng > 0) {
        this.center = { lat: lat, lng: lng };
        this.markCenter = { lat: lat, lng: lng };
      }
      this.getDistrictsLookUp(cityId)
    }else{
      this.districts = []

    }
  }
  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng.toJSON();
  }

  locate(){
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.form.value.mapLink)}&key=${environment.googleMapsApiKey}`;

    this.http.get<any>(geocodeUrl).subscribe((response) => {
      if (response.status === 'OK') {
        const location = response.results[0].geometry.location;
        this.center = { lat: location.lat, lng: location.lng };
        this.markCenter = { lat: location.lat, lng: location.lng };
        this.zoom = 15;
      } else {
        alert('Location not found.');
      }
    });
  }
  saveDraft(){
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }else{
      this.isVisibleSaveAndExit = true;

    }
  }
  validateCurrentPage(): boolean {
    return this.form?.valid;
  }

  isSubset(object1: any, object2: any): boolean {
    for (let key in object2) {
      // Check if object1 contains the key and the value is the same
      if (object2.hasOwnProperty(key) && object1[key] !== object2[key]) {
        return false; // Return false if any key-value pair does not match
      }
    }
    return true; // All key-value pairs from object2 match in object1
  }
  goNext(){
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }
    this.isVisibleSaveAndExit = false;
    if (this.isSubset({...this.vacationHome}, this.form.value)) {
      this.emitNext.emit('2');
    }else{
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success(

        this.localizationService.instant('::Host:VacationHome:successSave', 'Success')
      )
      if(this.id){
        this.emitNext.emit('2')
      }else{

        this.router.navigate(['/holiday-homes/add-edit-holiday-home',x.id])
      }
    });
  }
  }

  goBack(){
    this.emitNext.emit('0')
  }

    //make form marked
    makeFormAsMarkAdDirty() {
      Object.keys(this.form.controls).forEach(key => {
        var controls = this.form.get(key);
        if (controls instanceof FormControl) {
          controls.markAsDirty();
        }
      });
    }
    getCurrentSaveAction(isDraft = false) {
      const val = {
        ...this.form.value,
        id: this.id
      };
     return this.holidayHomeService.saveStep2ByInput({
       ...val,
       isOwningMultipleUnits: val.isOwningMultipleUnits ?? false,
       unitNumber: val.unitNumber ?? '',
       unitFloor: val.unitFloor ?? ''
     });

    }
  saveAndExit(){
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }
    this.isVisibleSaveAndExit = false;
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success(

        this.localizationService.instant('::Host:VacationHome:successSave', 'Success')
      )
            this.router.navigate(['/holiday-homes']);
    });
  }
  ngOnDestroy(): void {
    sessionStorage.removeItem('currentStep');
    localStorage.removeItem(this.id?.toString() ?? '');
  }
}
