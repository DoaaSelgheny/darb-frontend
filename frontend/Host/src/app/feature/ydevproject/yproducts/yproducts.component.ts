import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { noop, Observable } from 'rxjs';
import { ProductModel } from '../productmodel';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-yproducts',
  standalone: true,
  imports: [SharedModule, CommonModule, ProductCardComponent],
  templateUrl: './yproducts.component.html',
  styleUrl: './yproducts.component.scss',
})
export class YproductsComponent implements OnInit {
  /**
   *
   */
  products$: Observable<any[]> ;

  constructor(private _service:ProductService) {

  }
  ngOnInit(): void {
    this._service.getAllFromJSONFile().subscribe( (_products:Observable<any[]> ) =>
      this.products$ = _products,noop,
      ()=> console.log("Completed..",this.products$)
    );
  //  this.products$ =  this._service.getAllFromJSONFile();
  // console.log('from compo products$ :: ', this.products$);
  }
}
