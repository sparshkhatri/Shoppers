import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product = {};
  errorMessage = "";
  successMessage = "";
  pageTitle = "Add Product";
  id;
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.id = params.get('id');
        this.pageTitle = "Edit Product";
        this.productService.get(this.id).valueChanges().subscribe(product => {
          this.product = product;
        });
      }
    });
  }

  save(productForm){
    let product = productForm.value;
    if(this.id){
      // update product
      this.productService.update(this.id, product);
    }else{
      this.productService.create(product);
    }
    
    this.router.navigate(['/manage-products']);
    
  }

}
