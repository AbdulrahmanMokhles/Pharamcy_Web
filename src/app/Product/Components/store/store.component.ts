// import { HttpClientModule } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { ProductsService } from '../../Services/products.service';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-store',
//   standalone: true,
//   imports: [HttpClientModule, RouterModule],
//   providers: [ProductsService],
//   templateUrl: './store.component.html',
//   styleUrl: './store.component.css'
// })
// export class StoreComponent {
//   Products: any;

//   constructor(private service: ProductsService) { }
//   ngOnInit(): void {
//     this.getProducts();
//   }

//   getProducts() {
//     this.service.getAllProducts().subscribe({
//       next: (data) => {
//         console.log(data);
//         this.Products = data
//       },
//       error: (err) => { console.log(err) }
//     })
//   }

// }


import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { CartService } from '../../../User/cart.service';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FormsModule, CommonModule],
  providers: [ProductsService, CartService],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  showIcons: boolean = false;
  Products: any[] = [];
  pageSize: number = 9; // عدد المنتجات في كل صفحة
  currentPage: number = 1;
  totalPages: number = 0;
  currentPageProducts: any[] = [];
  displayedProductsIndexes: number[] = [];
  filteredProducts: any = "";

  user_id: any = localStorage.getItem("userId");

  constructor(private productService: ProductsService, private cartservice: CartService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.Products = data as any[];
        this.totalPages = Math.ceil(this.Products.length / this.pageSize);
        this.loadProducts();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.Products.length);
    this.currentPageProducts = this.Products.slice(startIndex, endIndex);
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

  AddtoCart(id: any) {
    this.cartservice.addToCart(id, this.user_id).subscribe();
  }

  onSearch(query: any) {
    // this.searchvalue = query;
    console.log(query);
    this.productService.searchProducts(query).subscribe(
      (data) => {
        // Handle search results here
        console.log(data);
        this.filteredProducts = data
      },
      (error) => {
        console.error(error);
      }
    );
    // this.fetchProducts();
    // console.log(this.filteredProducts)
    // console.log(this.searchvalue)
  }

}
