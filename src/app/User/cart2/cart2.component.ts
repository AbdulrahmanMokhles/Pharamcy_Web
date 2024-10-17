import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { CartService } from '../cart.service';
import { AlertDialogComponent } from '../../Shared/Components/alert-dialog/alert-dialog.component';
import { AppConfirmationComponent } from '../../Shared/Components/app-confirmation/app-confirmation.component';

@Component({
  selector: 'app-cart2',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterModule, MatDialogModule],
  providers: [CartService, UserService],
  templateUrl: './cart2.component.html',
  styleUrls: [
    './cart2.component.css',
  ],
})
export class Cart2Component implements OnInit {
  removeFromCart(_t90: any) {
    throw new Error('Method not implemented.');
  }
  cartItems: any[] = []; // Define the cart items array
  cartitem: any[] = [];
  userIdString = localStorage.getItem('userId');
  userId = Number(this.userIdString);
  counter: number = 0;
  sutotal = 0;
  errorMessage: string = '';

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog
    // private iduserlogin: IdUserLoginService
  ) {

    //  this.userId = this.userService.userId;

  }

  x: number = 0;
  ngOnInit(): void {
    //
    // if (this.userId !== null) {
    //   this.fetchUserCarts(this.userId);
    // }
    console.log(this.userId);
    console.log(this.userIdString)
    this.fetchUserCarts(this.userId);


    //     this.iduserlogin.getUserId().subscribe((userId) => {
    //       this.userId = userId;
    // console.log(userId);
    //       if (userId) {
    //        ;
    //       }
    //     });
  }
  fetchUserCarts(userId: number): void {
    this.cartService.getCartProducts(userId).subscribe(
      (carts) => {
        this.cartItems = carts;
        console.log(this.cartItems)
        this.x = userId;
        console.log(this.x);
        carts.forEach((element) => {
          this.calculateSubtotal();
          this.counter = element.quantity;
        });

        console.log('dina');
        console.log('User carts:', carts);
      },
      (error) => {
        console.error('Error fetching user carts:', error);
      }
    );
  }
  plus(id: number) {
    console.log(id);
    const item = this.cartItems.find((cart) => cart.id === id);
    if (item) {
      ++item.quantity;
      this.calculateSubtotal();
    }

    // ++this.counter;
  }
  minus(id: number) {
    console.log(id);
    const item = this.cartItems.find((cart) => cart.id === id);
    if (item) {
      if (item.quantity <= 1) {
        item.quantity = 1;
        this.calculateSubtotal();
      } else {
        --item.quantity;
        this.calculateSubtotal();
      }
    }
  }

  updateCarts(carr: any): void {
    this.cartService.updateCart(this.userId, carr).subscribe(
      (response) => {
        console.log('Cart updated successfully:', response);
        this.openAlertDialog(" تم التعديل بنجاح")
      },
      (error) => {
        if (error.status === 400) {
          this.openAlertDialog("لا توجد لدينا هذه الكميه")
        }
      }
    );
  }
  p = 1;
  updateCartQuantity(cartId: number, newQuantity: number, index: number): void {
    this.cartService.updateCartQuantity(this.userId, cartId, newQuantity).subscribe(
      (response) => {
        console.log('Cart quantity updated successfully:', response);
        this.openAlertDialog(" تمت التعديل بنجاح")
        // Handle successful update
      },
      (error) => {
        if (error.status === 400) {
          this.openAlertDialog(" لا توجد لدينا هذه الكميه")
        }
        console.error('Error updating cart quantity:', error);
        // Handle error
      }
    );
  }
  openAlertDialog(message: string): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '250px',
      data: { message: message }, // Pass the message to be displayed in the dialog
      panelClass: 'center-dialog' // Apply custom CSS class for centering
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after the dialog is closed
    });
  }

  checkout() {
    localStorage.setItem("total",this.sutotal.toString())
  }


  deletcart(userId: number, productId: number): void {
    const dialogRef = this.dialog.open(AppConfirmationComponent, {
      width: '250px',
      data: 'هل انت متأكد من الحذف؟',
      panelClass: 'center-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User clicked OK, proceed with deletion
        this.cartService.removeProductFromCart(this.userId, productId).subscribe(
          (response) => {
            // this.openAlertDialog("تمت المسح بنجاح");
            this.fetchUserCarts(this.userId);
            console.log('Product deleted successfully:', response);
            // Handle successful deletion
          },
          (error) => {
            console.error('Error deleting product from cart:', error);
            // Handle error
          }
        );
      } else {
        // User clicked cancel, do nothing
      }
    });
  }

  updateProductsInCart(): void {

    this.cartService.updateAllProductsInCart(this.userId, this.cartItems).subscribe(
      (response) => {
        this.openAlertDialog(" تم التعديل بنجاح")
        console.log('Products in cart updated successfully:', response);
        // Handle the response or update UI as needed
      },
      (error) => {
        if (error.status === 400) {
          this.errorMessage = 'لا توجد لدينا هذه الكميه';
        }
        // Handle the error
      }
    );
  }

  calculateSubtotal(): void {
    this.sutotal = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  clearErrorMessage() {
    this.errorMessage = ''; // Clear the error message
  }
  clearErrorMessages(i: number) {
    this.errorMessages[i] = '';
  }
  errorMessages: string[] = [];
}
