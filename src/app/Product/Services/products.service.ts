import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Helper/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public product_ID: number = 0;

  // DB_URL = "https://fakestoreapi.com/products";
  DB_URL = "http://localhost:59364/api/Products";
  // DB_URL = "http://localhost:19269/api/Product";
  constructor(private http: HttpClient) { }

  public editproduct_id!: number;

  getAllProducts() {
    return this.http.get(this.DB_URL);
  }

  getProductByID(id: any) {
    return this.http.get(this.DB_URL + "/" + id);
  }

  searchProducts(searchvalue: string) {
    return this.http.get(`${this.DB_URL}/q=${searchvalue}`);
  }

  AddProduct(product: any) {
    return this.http.post(this.DB_URL, product)
  }

  DeleteProduct(id: any) {
    return this.http.delete(this.DB_URL + "/" + id);
  }
}
