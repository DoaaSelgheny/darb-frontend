import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { CityDto } from '@proxy/cities';
import { DistrictService } from '@proxy/districts/district.service';
import { ExperienceHostService } from '@proxy/experiences/experience-host.service';
import * as L from 'leaflet';
import { isArray, LocalizationService, SessionStateService } from '@abp/ng.core';
import { TosterService } from 'src/shared/services/toster.service';
const iconRetinaUrl = 'assets/host/icons/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/host/icons/leaflet/marker-icon.png';
const shadowUrl = 'assets/host/icons/leaflet/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

@Component({
  selector: 'app-experiment-location',
  templateUrl: './experiment-location.component.html',
  styleUrl: './experiment-location.component.scss',
})
export class ExperimentLocationComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @Input() experience;
  @Output() emitNext = new EventEmitter<string>();
  @Input() initialLat?: number = null;
  @Input() initialLng?: number = null;

 currentCity: CityDto = null;
  cities: CityDto[] = [];
  districts=[]
  center: google.maps.LatLngLiteral = { lat: 24, lng: 46 };
  markCenter: google.maps.LatLngLiteral = { lat: 24, lng: 46 };
  zoom = 12;
  @Input()id;
  isVisibleSaveAndExit :boolean = false
  constructor(  private service: ExperienceHostService,
    public districtService:DistrictService,
    private route: ActivatedRoute,
    private toaster: TosterService,
    private localizationService: LocalizationService,
    private router: Router,
  ) {}
  form = new FormGroup({
    id:new FormControl(null),
    cityId: new FormControl(null, Validators.required),
    districtId: new FormControl(null, [Validators.required]),
    lng: new FormControl(null, Validators.required),
    lat: new FormControl(null, Validators.required),
    mapLink:new FormControl()
  })

  getLookupData() {
    this.service.getCityLookup().subscribe(data => {
      this.cities = data;
    });
  }
  getDistrictsLookUp(cityIdd:number){
    this.districtService.getList({
      maxResultCount: 1000 ,
      cityId:cityIdd
    }).subscribe(data => {
      this.districts = data.items;
    });
  }
  centerChanged() {
    const center = this.map.getCenter();
    this.markCenter = { lat: center.lat(), lng: center.lng() };
    this.form.patchValue({ lat: center.lat(), lng: center.lng() });
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
  ngOnInit(): void {
    this.getLookupData()
    this.id =this.route.snapshot.paramMap.get('id')
    if(this.experience){
      this.setValueToFormGroup(this.form as FormGroup, this.experience);
      this.getDistrictsLookUp(this.experience.cityId)

    }
    const lat = this.form.value['lat'] ?? this.initialLat;
    const lng = this.form.value['lng'] ?? this.initialLng;

    if (lat > 0 && lng > 0) {
      this.center = { lat: lat, lng: lng };
      this.markCenter = { lat: lat, lng: lng };
    }


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
  if (this.isSubset(this.experience, this.form.value)) {
    this.emitNext.emit('2')
  } else {
    this.submitFunction();
  }
}
submitFunction()
{
  this.isVisibleSaveAndExit = false;
  this.getCurrentSaveAction(true).subscribe(x => {
    this.toaster.success(

      this.localizationService.instant('::Host:VacationHome:successSave', 'Success')
    )
    if(this.id){
      this.emitNext.emit('2')
    }else{

      this.router.navigate(['/experiments/experiment-add-edit',x.id])
    }
  });
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
 return this.service.saveStep2ByInput(val as any);

}
goBack(){
  this.emitNext.emit('0')
}

saveAndExit() {
  if (!this.validateCurrentPage()) {
    this.makeFormAsMarkAdDirty();
    this.isVisibleSaveAndExit = false;
    return;
  }
  this.isVisibleSaveAndExit = false;
  this.getCurrentSaveAction(true).subscribe(x => {
    this.toaster.success(
      this.localizationService.instant('::Host:VacationHome:successSave', 'Success'),
    );
    this.router.navigate(['/experiments']);
  });
}
ngOnDestroy(): void{
  sessionStorage.removeItem('current');
  localStorage.removeItem('current');
}
}
