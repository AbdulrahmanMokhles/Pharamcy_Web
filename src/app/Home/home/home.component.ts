import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../Product/Services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FormsModule],
  providers: [ProductsService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  @Input() searchTerm: string = '';
  filteredProducts: any[] = [];
  Products: any;
  randomProducts: any[] = [];
  searchResults: any[] = [];
  constructor(private productService: ProductsService) { }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.Products = data;
        this.getRandomProducts();
      },
      error: (err) => { console.log(err) }
    })
  }

  getRandomProducts() {
    const indices = Array.from({ length: this.Products.length }, (_, i) => i);
    const selectedIndices = [];

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * indices.length);
      const selectedIndex = indices[randomIndex];

      this.randomProducts.push(this.Products[selectedIndex]);
      indices.splice(randomIndex, 1);
      selectedIndices.push(selectedIndex);
    }
  }

}
