import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  create(product){
    return this.db.list('products').push(product);
  }

  update(id, product){
    return this.db.object('/products/'+id).update(product);
  }

  getAll(): AngularFireList<Product>{
    return this.db.list('products');
  }

  remove(id){
    this.db.object('/products/'+id).remove();
  }

  get(productId): AngularFireObject<Product>{
    return this.db.object('/products/'+productId);
  }
}
