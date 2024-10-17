import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { IProduct } from '../../Helper/Product';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { AlertDialogComponent } from '../../../Shared/Components/alert-dialog/alert-dialog.component';
import { AppConfirmationComponent } from '../../../Shared/Components/app-confirmation/app-confirmation.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [ProductsService],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  constructor(private service: ProductsService, public dialog: MatDialog) { }

  showIcons: boolean = false;
  products: any[] = [];
  pageSize: number = 10; // عدد المنتجات في كل صفحة
  currentPage: number = 1;
  totalPages: number = 0;
  currentPageProducts: any[] = [];
  displayedProductsIndexes: number[] = [];

  // products: IProduct[] = [];

  filteredProducts: any = "";

  searchvalue: any = "";

  // searchform = this.fb.nonNullable.group({
  //   searchvalue: "",
  // });

  // searchform = new FormGroup({
  //   searchvalue: new FormControl("")
  // })

  private editProduct_id: any;

  ngOnInit(): void {
    // console.log(this.filteredProducts);
    // this.getProducts();
    this.service.getAllProducts().subscribe({
      next: (data) => {
        this.products = data as any[];
        this.totalPages = Math.ceil(this.products.length / this.pageSize);
        this.loadProducts();
      },
      error: (err) => {
        console.log(err);
      }
    });

    // this.filteredProducts = this.products;
  }


  // fetchProducts() {
  //   this.service.searchProducts(this.searchvalue).subscribe((filteredProducts) => {
  //     this.filteredProducts = filteredProducts;
  //   })
  // }

  onSearch(query: any) {
    // this.searchvalue = query;
    console.log(query);
    this.service.searchProducts(query).subscribe(
      (data) => {
        // Handle search results here
        console.log(data);
        this.filteredProducts = data;
      },
      (error) => {
        console.error(error);
      }
    );
    // this.fetchProducts();
    // console.log(this.filteredProducts)
    // console.log(this.searchvalue)
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
      // if(result) {
      // this.getProducts();
      // }
      // this.checkPageProductLimit();
    })
  }

  updateProduct(p_id: any) {
    this.service.editproduct_id = p_id;
    // console.log(this.service.editproduct_id);
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // if(result) {
      this.getProducts()
      // }
    })

  }

  getProducts() {
    this.service.getAllProducts().subscribe({
      next: (data: any) => {
        console.log(data);
        this.products = data
      },
      error: (err) => { console.log(err) }
    })
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(AppConfirmationComponent, {
      width: '250px',
      data: 'هل انت متأكد من الحذف؟',
      panelClass: 'center-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User clicked OK, proceed with deletion
        this.service.DeleteProduct(id).subscribe(
          (response) => {
            // this.openAlertDialog("تمت المسح بنجاح");
            this.openAlertDialog("تم حذف المنتج بنجاح");
            window.location.reload();
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

  loadProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.products.length);
    this.currentPageProducts = this.products.slice(startIndex, endIndex);
    this.displayedProductsIndexes = [];
    for (let i = startIndex; i < endIndex; i++) {
      this.displayedProductsIndexes.push(i);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  checkPageProductLimit(): void {
    if (this.currentPageProducts.length === 3) {
      alert("الرجاء الانتقال الى الصفحة التالية لرؤية المنتج الذي تم اضافته ");
    } else {
      return;
    }
  }

}




