import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MyMaterialModule } from 'src/app/my-material.module';
import { SharedModule } from 'src/shared/shared.module';
import { ProductModel } from '../productmodel';

@Component({
  selector: 'app-product-card',
  standalone: true,
imports:[CommonModule,SharedModule,MyMaterialModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  /**
   *
   */
  @Input('prodModel')
  product:ProductModel;

  constructor() {
   // super();

  }

}
