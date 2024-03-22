import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [HttpClientModule,
    RouterModule,
  ],
  providers: [ProductsService],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  products: any;
  form!: FormGroup
  // base64: any = "";

  constructor(private service: ProductsService, public dialog: MatDialog,
    private fb: FormBuilder) { }
  ngOnInit(): void {
    this.getProducts();
    this.createform()
  }



  createform() {
    this.form = this.fb.group({
      P_name: [''],
      P_price: [''],
      P_description: [''],
      P_quantity: [''],
      P_image: ['']
    })
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getProducts()
      }
    })
}

  getProducts() {
    this.service.getAllProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data
      },
      error: (err) => { console.log(err) }
    })
  }

  delete(id: any) {
    alert("هل تريد حذف هذا المنتج")
    this.service.DeleteProduct(id).subscribe({
      next: (id) => {
        alert("تم حذف المنتج بنجاح")
        console.log(id);
        this.getProducts();
      }, error: (err) => { console.log(err) }
    });
  }

  update(product: any) {
    const dialogRef = this.dialog.open(AddProductComponent, {
      height: "600px",
      data: product
    });
    dialogRef.afterClosed().subscribe({
      next: () => { this.getProducts(); },
      error: (err) => { console.log(err) }
    })
  }


  // openDialog(): void {
  //   const dialogRef = this.dialog.open(AddProductComponent, {
  //     height: "600px"
  //   });

  //   // dialogRef.afterClosed().subscribe({
  //   //   next: () => {
  //   //     console.log("Closed");
  //   //     alert("تمت اضافة المنتج بنجاح");
  //   //     this.getProducts();
  //   //   },
  //   //   error: (err) => { console.log(err) }
  //   // });
  // }


}




