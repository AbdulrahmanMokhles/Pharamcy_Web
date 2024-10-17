import { Component } from '@angular/core';
import { CartService } from '../../../cart.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OrdersService } from '../../../../Orders/services/orders.service';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  providers: [CartService, OrdersService],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss'
})
export class AddOrderComponent {
  userIdString: any = localStorage.getItem('userId');
  total: any = localStorage.getItem("total");

  cartItems: any[] = [];

  constructor(private cartService: CartService, private orderservice: OrdersService) { }


  ngOnInit(): void {
    this.fetchUserCarts(this.userIdString);
  }


  fetchUserCarts(userId: number): void {
    this.cartService.getCartProducts(userId).subscribe(
      (carts) => {
        this.cartItems = carts;
        console.log(this.cartItems)
        // this.x = userId;
        // console.log(this.x);
        // carts.forEach((element) => {
        //   this.calculateSubtotal();
        //   this.counter = element.quantity;
        // });

        console.log('dina');
        console.log('User carts:', carts);
        console.log('User carts:', this.cartItems);
      },
      (error) => {
        console.error('Error fetching user carts:', error);
      }
    );
  }

  sendorder() {
    // let cartObj = this.cartService.getCartsByUser(this.userIdString).subscribe();
    const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
    let time = new Date(DATE_TIME_FORMAT)

    let addedorder = {
      order: {
        orderStatus: false,
        totalBalance: this.total,
        orderTime: "2024-03-27T06:11:57.3888744"
      },
      userID: this.userIdString
    }
    console.log(time.getDate());
    this.orderservice.addorder(addedorder).subscribe();
    console.log(addedorder);
    console.log("added");

  }
}
