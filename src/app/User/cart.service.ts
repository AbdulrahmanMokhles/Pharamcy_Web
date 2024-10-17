import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly baseUrl = 'http://localhost:59364/api/Carts';

  constructor(private http: HttpClient) { }
  deleteUser(userId: number): Observable<any> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.delete<any>(url);
  }

  removeProductFromCart(userId: number, productId: number): Observable<any> {
    // debugger;
    const url = `${this.baseUrl}/${userId}/products/${productId}`;
    return this.http.delete<any>(url);
  }
  getCartProducts(userId: number): Observable<any[]> {
    const url = `${this.baseUrl}/${userId}/products`;
    return this.http.get<any[]>(url);
  }
  addToCart(productId: number, userId: number): Observable<any> {
    var url = `${this.baseUrl}/productid,userID?productId=${productId}&userID=${userId}`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error adding to cart:', error);
        return throwError(error);
      })
    );
  }
  getCartsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ByUser/${userId}`);
  }

  updateCartsByUser(userId: number, cartss: any[]): Observable<any[]> {
    return this.http.put<any[]>(`${this.baseUrl}/ByUser/${userId}`, cartss);
  }
  updateCart(id: number, cart: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, cart).pipe(
      catchError((error) => {
        console.error('Error updating cart:', error);
        return throwError(error);
      })
    );
  }
  updateAllProductsInCart(userId: number, updateModel: any): Observable<any> {
    const url = `${this.baseUrl}/${userId}/UpdateAllProducts`;
    return this.http.put<any>(url, updateModel);
  }
  updateCartQuantity(
    userId: number,
    productId: number,
    newQuantity: number
  ): Observable<any> {
    const url = `${this.baseUrl}/${userId}/products/${productId}/UpdateQuantity`;
    return this.http.put(url, newQuantity).pipe(
      catchError((error) => {
        console.error('Error updating cart quantity:', error);
        return throwError(error);
      })
    );
  }
  createCartForUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}/products`);
  }
  getcart(userId: number) {
    return this.http.get<any>(`${this.baseUrl}/cart=${userId}`);
  }
}
