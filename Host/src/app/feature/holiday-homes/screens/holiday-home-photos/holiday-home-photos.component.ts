import { isArray, LocalizationService, SessionStateService } from '@abp/ng.core';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { VacationHomeHostService } from '@proxy/vacation-homes';
import { environment } from 'src/environments/environment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfrontationTypes } from 'src/shared/ui-components/confrontation-popup/confrontation-types.enum';
import { TosterService } from 'src/shared/services/toster.service';

@Component({
  selector: 'app-holiday-home-photos',
  templateUrl: './holiday-home-photos.component.html',
  styleUrl: './holiday-home-photos.component.scss',
})
export class HolidayHomePhotosComponent implements OnInit, OnDestroy {
  @Input() vacationHome: any;
  @Input() id: any;
  @Output() emitNext = new EventEmitter<string>();
  isVisibleSaveAndExit: boolean = false;
  form = new FormGroup({
    primaryImages: new FormArray([], []),
    mainImage: new FormControl(null),
  });
  uploadPhotoUrl = `${environment.apis.default.url}/api/app/vacation-home-hosts/upload`;
  downloadPhotoUrl = `${environment.apis.default.url}/api/app/vacation-home-hosts/download`;
  isSiteLanguageArabic = false;

  selectedImages: string[] = []; // To track selected images
  isDeletePopupOpen = false;
  isDeleteOnePopupOpen=false
  confrontationTypesEnum = ConfrontationTypes;
  vacationHomePhotosLabel: string;
  deletedIndex
  constructor(
    private modal: NzModalService,
    public holidayHomeService: VacationHomeHostService,
    private localizationService: LocalizationService,
    private toaster: TosterService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionState: SessionStateService,

  ) {}

  ngOnInit(): void {
    this.isSiteLanguageArabic = this.sessionState.getLanguage() === 'ar';

    this.images.clear();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.vacationHome) {
      this.setValueToFormGroup(this.form as FormGroup, this.vacationHome);
      this.form.patchValue({
        mainImage: this.vacationHome.primaryImage,
        primaryImages:this.vacationHome.primaryImages
      });
    }
  }

  get images() {
    return this.form.get('primaryImages') as FormArray;
  }
  get mainImage() {
    return this.form.get('mainImage') as FormControl;
  }
  addImage(event) {
    if (event?.type == 'success') {
      this.images.push(new FormControl(`${this.downloadPhotoUrl}/${event.file.response.name}`));
      this.updateValues();
    }
  }

  addMainImage(src,index?) {
    let imageSrc = src;

    this.images.push(new FormControl(this.mainImage.value));
    this.delete(index)

    this.mainImage.setValue(imageSrc);
  }
  setFirstImgAsMain(){
    if(!this.mainImage.value){
      this.mainImage.setValue(this.images.value[0])
      this.images.controls.splice(0, 1);
    }
  }
  deleteAllPhotos() {
    this.images.clear(); // Clear the entire FormArray
    this.updateValues();
  }
  delete(index) {
    if(index === 'main'){
      this.mainImage.setValue(null)

    }else{
      this.images.controls.splice(index, 1);
      this.updateValues();
    }
  }
  deleteOne(index){
    this.deletedIndex = index
  }
  updateValues() {

      // Filter out controls with null or undefined values
      const validControls = this.images.controls.filter(control => control.value !== null);

      // Set the filtered controls back to the FormArray
      this.images.clear(); // Clear the FormArray first
      validControls.forEach(control => this.images.push(control)); // Add back valid controls

  }
  deleteSelectedImages() {
    this.selectedImages.forEach(image => {
      const index = this.images.controls.findIndex(control => control.value === image);
      if (index !== -1) {
        this.images.removeAt(index);
      }
    });
    this.selectedImages = []; // Clear the selection after deletion
    this.updateValues();
  }
  // Method to toggle selection of an image
  toggleSelection(image: string, event: any) {
    if (event.target.checked) {
      this.selectedImages.push(image);
    } else {
      this.selectedImages = this.selectedImages.filter(img => img !== image);
    }
  }
  isSelectedAppear: boolean = false;
  applyToSelect() {
    this.isSelectedAppear = !this.isSelectedAppear;
  }
  Deselect() {
    this.isSelectedAppear = !this.isSelectedAppear;
    this.selectedImages = [];
  }
  // Method to preview the image
  previewImage(imageUrl: string, event: MouseEvent) {
    event.stopPropagation();
    this.modal.create({
      nzTitle: null,
      nzContent: `<img src="${imageUrl}" alt="Preview" style="min-width: 100%;"/>`,
      nzFooter: null,
      nzBodyStyle: { padding: '0' },
      nzMaskClosable: true,
      nzClosable: true,
      nzCentered:true,
      nzWidth:'320px'
    });
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

  validateCurrentPage(): boolean {
    return this.images.controls.length > 0 || this.mainImage.value;
  }
   isSubset(object1: any, object2: any): boolean {
    // If object2 is not an object or array, perform a direct comparison
    if (typeof object2 !== 'object' || object2 === null) {
      return object1 === object2;
    }

    // If object2 is an array, check if every element in object2 is present in object1
    if (Array.isArray(object2)) {
      if (!Array.isArray(object1)) {
        return false; // Mismatch: one is an array and the other is not
      }
      return object2.every((item2) =>
        object1.some((item1) => this.isSubset(item1, item2))
      );
    }

    // If object2 is an object, check if all keys in object2 exist in object1 with matching values
    for (const key in object2) {
      if (object2.hasOwnProperty(key)) {
        if (!object1.hasOwnProperty(key) || !this.isSubset(object1[key], object2[key])) {
          return false;
        }
      }
    }

    return true; // All keys and values in object2 match in object1
  }
  goNext() {
    this.setFirstImgAsMain()
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }
    const imageArray = this.form?.get('primaryImages') as FormArray;
    imageArray.setValue(imageArray.controls.map(x => x.value));
    this.isVisibleSaveAndExit = false;
    if (this.isSubset({
      primaryImages:this.vacationHome.primaryImages,
      mainImage:this.vacationHome.primaryImage
    }, this.form.value)) {
      this.emitNext.emit('8');
    }else{
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success(
        this.localizationService.instant('::Host:VacationHome:successSave', 'Success'),
      );
      if (this.id) {
        this.emitNext.emit('8');
      } else {
        this.router.navigate(['/holiday-homes/add-edit-holiday-home', x.id]);
      }
    });
  }
  }
  goBack() {
    this.emitNext.emit('6');
  }

  //make form marked
  makeFormAsMarkAdDirty() {
    Object.keys(this.form.controls).forEach(key => {
      var controls = this.form.get(key);
      if (controls instanceof FormControl) {
        controls.markAsDirty();
        if (key === 'mainImage') this.toaster.error('من فضلك قم برفع علي الاقل صوره ');
      } else if (controls instanceof FormArray) {
        if (key === 'primaryImages') this.toaster.error('من فضلك قم برفع علي الاقل صوره ');
      }
    });
  }
  getCurrentSaveAction(isDraft = false) {
    const val = {
      primaryImages: this.form.value.primaryImages,
      mainImage: this.form.value.mainImage,
      id: this.id,
    };
    return this.holidayHomeService.saveStep8ByInput(val);
  }
  saveAndExit() {
    this.setFirstImgAsMain()
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }
    const imageArray = this.form?.get('primaryImages') as FormArray;
    imageArray.setValue(imageArray.controls.map(x => x.value));
    this.isVisibleSaveAndExit = false;
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success(
        this.localizationService.instant('::Host:VacationHome:successSave', 'Success'),
      );
      this.router.navigate(['/holiday-homes']);
    });
  }
  saveDraft() {
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    } else {
      this.isVisibleSaveAndExit = true;
    }
  }
  ngOnDestroy(): void {
    sessionStorage.removeItem('currentStep');
    localStorage.removeItem(this.id?.toString() ?? '');
  }
}
