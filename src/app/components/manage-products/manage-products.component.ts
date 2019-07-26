import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit, OnDestroy {
  products = [];
  subscription: Subscription;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll().snapshotChanges().subscribe(productList => {
      this.products = productList.map(product => {
          let productObj = product.payload.val();
          productObj['key'] = product.payload.key;
          return productObj;
      });
    });
  }

  removeProduct(productId){
    if(confirm('Are you sure want to delete this product?')){
      this.productService.remove(productId);
    }
   
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
