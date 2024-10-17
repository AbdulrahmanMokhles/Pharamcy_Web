import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../services/orders.service';
import { UserService } from '../../../User/user.service';
import { AppConfirmationComponent } from '../../../Shared/Components/app-confirmation/app-confirmation.component';
import { AlertDialogComponent } from '../../../Shared/Components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [OrdersService, UserService],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss'
})


export class OrdersTableComponent implements OnInit {
  constructor(public dialog: MatDialog, private orderservice: OrdersService, private userservice: UserService) { }
  orders: any;
  status: boolean = false;
  someCondition: boolean = false;

  userId: any = localStorage.getItem('userId');

  username: any = "";

  ngOnInit(): void {
    this.displayAll();
  }

  displayAll() {
    this.orderservice.getAll().subscribe(
      (data) => {
        this.orders = data;
        /* this.orders.forEach((element:orders) => {
          console.log(element);
          if (element.orderStatus) {
            this.status = element.orderStatus;
          }
          else {
            this.status = element.orderStatus;
          }
        }); */
        /* for (let element in this.orders) {
          console.log(this.orders[element].orderStatus);
          this.status = this.orders[element].orderStatus;
          console.log(this.status);
        } */
        // this.username= this.userservice.getUserById(this.userId)
        console.log(this.orders[0].user.id);
      },
      (err) => { console.log(err) }
    );
  }

  updateStatus(id: any, i: number) {
    console.log(this.orders[i]);
    this.orders[i].orderStatus = true;
    // this.orderservice.update(id, this.orders[i].).subscribe(
    //   (data) => {
    //     this.displayAll();
    //   }
    // )
  }

  deleteOrder(id: any) {
    // if (confirm("Are you sure you want to delete this order ?")) {
    //   this.orderservice.delete(id).subscribe(
    //     (data) => {
    //       this.displayAll();
    //     }
    //   )
    // }
    const dialogRef = this.dialog.open(AppConfirmationComponent, {
      width: '250px',
      data: 'هل انت متأكد من الحذف؟',
      panelClass: 'center-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User clicked OK, proceed with deletion
        this.orderservice.delete(id).subscribe(
          (response) => {
            // this.openAlertDialog("تمت المسح بنجاح");
            this.openAlertDialog("تم حذف الطلب بنجاح");
            // window.location.reload();
            // this.getProducts();
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


  Detalis(id: any) {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: "500px",
      panelClass: "center-dialog"
    });

    dialogRef.afterClosed().subscribe(result => {

    });

    this.orderservice.orderDetails(id).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }
}
