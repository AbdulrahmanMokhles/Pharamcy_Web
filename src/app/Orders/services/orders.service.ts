import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private client: HttpClient) { }

  DB_URL = "http://localhost:59364/api/Order";

  getAll() {
    return this.client.get(this.DB_URL);
  }

  addorder(order: any) {
    return this.client.post(this.DB_URL, order);
  }

  update(id: any, order: any) {
    return this.client.put(this.DB_URL + "/" + id, order);
  }

  orderDetails(id: any) {
    return this.client.get(this.DB_URL + "/" + id);
  }

  delete(id: any) {
    return this.client.delete(this.DB_URL + "/" + id);
  }

}
