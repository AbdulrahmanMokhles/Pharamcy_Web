import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ProductsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  id: any;
  product: any;
  constructor(private route: ActivatedRoute, private service: ProductsService) {
    this.id = route.snapshot.paramMap.get("id");
    console.log(this.id);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {

    this.service.getProductByID(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.product = data
      },
      error: (err) => { console.log(err) }
    })
  }


}
