import { Component } from '@angular/core';

@Component({
  selector: 'app-testt',
  standalone: true,
  templateUrl: './testt.component.html',
  styleUrl: './testt.component.css'
})
export class CartComponent {
  cart: { product_id: string; quantity: number }[] = [];

  constructor() {
    this.initApp();
  }

  private initApp() {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart')!);
      this.addCartToHTML();
    }
  }

  private setProductInCart(idProduct: string, value: number) {
    let positionThisProductInCart = this.cart.findIndex((value) => value.product_id == idProduct);
    if (value <= 0) {
      this.cart.splice(positionThisProductInCart, 1);
    } else if (positionThisProductInCart < 0) {
      this.cart.push({
        product_id: idProduct,
        quantity: 1
      });
    } else {
      this.cart[positionThisProductInCart].quantity = value;
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.addCartToHTML();
  }

  private addCartToHTML() {
    // Your implementation for adding cart items to HTML
  }

  onClick(event: Event) {
    let buttonClick = event.target as HTMLElement;
    let idProduct = buttonClick.dataset['id'];

    let quantity = null;
    let positionProductInCart = this.cart.findIndex((value) => value.product_id == idProduct);
    switch (true) {
      case (buttonClick.classList.contains('addCart')):
        quantity = (positionProductInCart < 0) ? 1 : this.cart[positionProductInCart].quantity + 1;
        this.setProductInCart(idProduct!, quantity);
        break;
      case (buttonClick.classList.contains('minus')):
        quantity = this.cart[positionProductInCart].quantity - 1;
        this.setProductInCart(idProduct!, quantity);
        break;
      case (buttonClick.classList.contains('plus')):
        quantity = this.cart[positionProductInCart].quantity + 1;
        this.setProductInCart(idProduct!, quantity);
        break;
      default:
        break;
    }
  }
}