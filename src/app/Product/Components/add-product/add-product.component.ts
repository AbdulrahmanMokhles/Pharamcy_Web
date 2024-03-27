import { Component } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ProductsService],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  constructor(private service: ProductsService, private http: HttpClient,) { }

  Form1 = new FormGroup({
    name : new FormControl("",Validators.required),
    price : new FormControl("",Validators.required),
    quantity : new FormControl("",Validators.required),
    description : new FormControl("",Validators.required),
  })

  public description: any = "";

  imagefilename = "";

  onFileSelected(event: any) {
    console.log(event.target.value);

    if (event.target.value) {
      this.imagefilename = event.target.value;
    }
  }

  // Add(name: any, price: any, description: any, quantity: any) {
  //   // let image : any = this.imagefilename

  //   const formdata = new FormData();
  //   let image = formdata.append("image", this.imagefilename);
  //   let newproduct = { name, price, description, quantity, image };
  //   console.log(newproduct);
  //   this.service.AddProduct(newproduct).subscribe();
  // }

  Add() {

  }

}
