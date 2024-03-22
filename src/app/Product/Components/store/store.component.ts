import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  providers: [ProductsService],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
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
