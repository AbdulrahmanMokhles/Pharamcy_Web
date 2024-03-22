import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // DB_URL = "https://fakestoreapi.com/products";
  DB_URL = "http://localhost:19269/api/Product";
  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(this.DB_URL);
  }

  getProductByID(id: any) {
    return this.http.get(this.DB_URL + "/" + id);
  }

  AddProduct(product: any) {
    return this.http.post(this.DB_URL, product)
  }

  DeleteProduct(id: any) {
    return this.http.delete(this.DB_URL + "/" + id);
  }
}
