import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  providers: [ProductsService],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {

  Products: any;

  constructor(private service: ProductsService) { }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.service.getAllProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.Products = data
      },
      error: (err) => { console.log(err) }
    })
  }
}
