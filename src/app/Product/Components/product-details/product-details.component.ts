import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../../User/cart.service';
import { AlertDialogComponent } from '../../../Shared/Components/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ProductsService, CartService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  id: any;
  product: any;

  user_id: any = localStorage.getItem("userId");
  constructor(private route: ActivatedRoute, private service: ProductsService, private cartservice: CartService
    ,private dialog : MatDialog) {
    this.id = route.snapshot.paramMap.get("id");
    // console.log(this.id);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {

    this.service.getProductByID(this.id).subscribe({
      next: (data) => {
        // console.log(data);
        this.product = data
      },
      error: (err) => { console.log(err) }
    })
  }

  // AddtoCart(id: any) {
  //   this.cartservice.addToCart(id, this.user_id).subscribe();
  // }
  AddtoCart(id: any) {
    // debugger;
    this.cartservice.addToCart(id, this.user_id).subscribe(
      (response) => {
        console.log('Cart updated successfully:', response);
        this.openAlertDialog(' تم الاضافه بنجاح');
      },
      (error) => {
        if (
          error.status === 400 &&
          error.error ===
            'User not found. Please sign up or log in to continue.'
        ) {
          this.openAlertDialog(
            'من فضلك اذهب اولا الي انشاء حساب او تسجيل دخول'
          );
        } else if (
          error.status === 400 &&
          error.error ===
            'Product already exists in the cart. Quantity incremented.'
        ) {
          this.openAlertDialog('لقد قمت باضافته سابقا');
        } else {
          console.error('Error:', error);
        }
      }
    );
  }
  openAlertDialog(message: string): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '250px',
      data: { message: message }, // Pass the message to be displayed in the dialog
      panelClass: 'center-dialog', // Apply custom CSS class for centering
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // Handle any actions after the dialog is closed
    });
  }

}
