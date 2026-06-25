import { isArray, LocalizationService, SessionStateService } from '@abp/ng.core';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { VacationHomeHostService } from '@proxy/vacation-homes';
import { environment } from 'src/environments/environment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfrontationTypes } from 'src/shared/ui-components/confrontation-popup/confrontation-types.enum';
import { TosterService } from 'src/shared/services/toster.service';
import { ExperienceHostService, ImagesRequestDto } from '@proxy/experiences';

@Component({
  selector: 'app-holiday-home-photos',
  templateUrl: './holiday-home-photos.component.html',
  styleUrl: './holiday-home-photos.component.scss',
})
export class HolidayHomePhotosComponent implements OnInit, OnDestroy {
  @Input() experience: any;
  @Input() id: any;
  @Output() emitNext = new EventEmitter<string>();
  isVisibleSaveAndExit: boolean = false;
  form = new FormGroup({
    primaryImages: new FormArray([], []),
    mainImage: new FormControl(null),
    images: new FormArray([], []),
  });
  uploadPhotoUrl = `${environment.apis.default.url}/api/app/vacation-home-hosts/upload`;
  downloadPhotoUrl = `${environment.apis.default.url}/api/app/vacation-home-hosts/download`;
  isSiteLanguageArabic = false;

  selectedImages: string[] = []; // To track selected images
  isDeletePopupOpen = false;
  isDeleteOnePopupOpen = false;
  confrontationTypesEnum = ConfrontationTypes;
  vacationHomePhotosLabel: string;
  deletedIndex;
  constructor(
    private modal: NzModalService,
    public service: ExperienceHostService,
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
    if(this.id)
      {
        this.service.getWithNavigationProperties(Number(this.id)).subscribe((data: any) => {
          this.experience = data.experience;
          this.setValueToFormGroup(this.form as FormGroup, this.experience);
          let pArray=[];
          let mArray=[];
          if(this.experience.images.length>0){
          this.experience.images.forEach(element => {

          if(element.isMain==true)
          {
            mArray.push(element.imagePath)
          }
          else if(element.isMain==false)
          {
            pArray.push(element.imagePath)
          }
          });

          this.form.patchValue({
            mainImage: mArray,
            primaryImages: pArray,
          });
          pArray.forEach(element => {
            this.images.push(new FormControl(element))
          });
          // this.images.clear()
        }

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

  addMainImage(src, index?) {
    let imageSrc = src;

    this.images.push(new FormControl(this.mainImage.value));
    this.delete(index);

    this.mainImage.setValue(imageSrc);
  }
 imagesArr: ImagesRequestDto[] = [];
  setFirstImgAsMain() {


    if (!this.mainImage.value) {
      //  this.mainImage.setValue(this.images.value[0]);
      //  this.form.value.primaryImages.shift()
      this.imagesArr.push({ imagePath: this.images.value[0], isMain: true });
       this.images.value.shift();
      this.images.value.forEach(element => {
        this.imagesArr.push({ imagePath: element, isMain: false });
      });
    }
    else{

      this.images.value.forEach(element => {
        this.imagesArr.push({ imagePath: element, isMain: false });
      });
if( Array.isArray(this.mainImage.value))
{
  this.imagesArr.push({ imagePath: this.mainImage.value[0], isMain: true });
}else{
  this.imagesArr.push({ imagePath: this.mainImage.value, isMain: true });
}

    }
  }
  deleteAllPhotos() {
    this.images.clear(); // Clear the entire FormArray
    this.updateValues();
  }
  delete(index) {
    if (index === 'main') {
      this.mainImage.setValue(null);
    } else {
      this.images.controls.splice(index, 1);
      this.updateValues();
    }
  }
  deleteOne(index) {
    this.deletedIndex = index;
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
      nzContent: `<img src="${imageUrl}" alt="Preview" style="width: 100%;"/>`,
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
  checkObjectsEqual(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  compareArraysUnordered(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    const hasObjects = arr1.some(item => typeof item === 'object' && !Array.isArray(item) && item !== null);
  if(hasObjects)
  {
   for(let i=0; i<arr1.length;i++)
   {
    if( !this.checkObjectsEqual(arr1[i],arr2[i]))
    {
      return false
    }
   }
   return true;

  }
    return arr1.sort().toString() === arr2.sort().toString();
  }
  isSubset(object1: any, object2: any): boolean {
    for (let key in object2) {
      // Check if object1 contains the key and the value is the same
      if (
        object2.hasOwnProperty(key) &&
        (Array.isArray(object1[key])
          ? !this.compareArraysUnordered(object1[key], object2[key])
          : object1[key] !== object2[key])
      ) {
        return false; // Return false if any key-value pair does not match
      }
    }

    return true; // All key-value pairs from object2 match in object1
  }
  isSubsetImages(object1: any, object2: any): boolean {

    return this.compareArraysUnordered(object1,object2); // All key-value pairs from object2 match in object1
  }
  goNext() {
    this.setFirstImgAsMain();
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }
    let imagesInForm=[];
    if(this.experience.images.length>0){
    this.experience.images.forEach(element => {
      imagesInForm.push(element.imagePath)
    });}
    let imagesInNewForm=[];
    if(this.imagesArr.length>0){
      this.imagesArr.forEach(element => {
        imagesInNewForm.push(element.imagePath)
      });}
      let primary;
      if( Array.isArray(this.mainImage.value))
        {
          primary= this.mainImage.value[0]

        }else{
          primary= this.mainImage.value

        }
    if (this.isSubsetImages(imagesInForm,  imagesInNewForm)&&this.experience.primaryImage===primary) {
      this.emitNext.emit('4');
    } else {
      this.submitFunction();
    }
  }
  submitFunction()
  {
    this.isVisibleSaveAndExit = false;
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success(
        this.localizationService.instant('::Host:VacationHome:successSave', 'Success'),
      );
      if (this.id) {
        this.emitNext.emit('4');
      } else {
        this.router.navigate(['/experiments/experiment-add-edit/',this.id]);
      }
    });
  }
  goBack() {
    this.emitNext.emit('2');
  }

  //make form marked
  makeFormAsMarkAdDirty() {
    Object.keys(this.form.controls).forEach(key => {
      var controls = this.form.get(key);
      if (controls instanceof FormControl) {
        ////debugger;
        controls.markAsDirty();

        if (key === 'mainImage') this.toaster.error('من فضلك قم برفع علي الاقل صوره ');
      } else if (controls instanceof FormArray) {
        if (key === 'primaryImages') this.toaster.error('من فضلك قم برفع علي الاقل صوره ');
      }
    });
  }
  getCurrentSaveAction(isDraft = false) {
    let submitImages=[];
    this.imagesArr.forEach(element => {
      if(Array.isArray(element.imagePath))
      {
        submitImages.push({imagePath:element.imagePath[0], isMain: element.isMain})
      }else{
        submitImages.push({imagePath:element.imagePath, isMain: element.isMain})
      }
     });
    const val = {
      images:submitImages,
      id: this.id,
    };
    return this.service.saveStep4ByInput(val as any);
  }
  saveAndExit() {
    if (!this.validateCurrentPage()) {
      this.makeFormAsMarkAdDirty();
      this.isVisibleSaveAndExit = false;
      return;
    }
    this.isVisibleSaveAndExit = false;
    const imageArray = this.form?.get('primaryImages') as FormArray;
    imageArray.setValue(imageArray.controls.map(x => x.value));
    const images = this.form?.value?.['primaryImages'] as FormArray;

    if ((images || []).length < 1) {
      if (this.localizationService.currentLang == 'ar')
        this.toaster.error('عدد الصور أقل من الحد المسموح (1)');
      else if (this.localizationService.currentLang == 'en')
        this.toaster.error('you need to upload 1 images as minimum');
      else this.toaster.error('您至少需要上傳 1 張圖片');
      return;
    }
    this.setFirstImgAsMain();
    this.getCurrentSaveAction(true).subscribe(x => {
      this.toaster.success(
        this.localizationService.instant('::Host:VacationHome:successSave', 'Success'),
      );
      this.router.navigate(['/experiments']);
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
