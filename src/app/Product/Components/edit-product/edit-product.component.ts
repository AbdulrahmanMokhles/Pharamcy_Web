import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [HttpClientModule, RouterModule, ReactiveFormsModule],
  providers: [ProductsService],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {

  constructor(private service: ProductsService) { }
  private productIdToUpdate = this.service.editproduct_id;

  // product: any = this.service.getProductByID(this.productIdToUpdate).subscribe({
  //   next: (data) => {
  //     console.log(this.productIdToUpdate)
  //     console.log(data);
  //     this.product = data
  //   },
  //   error: (err) => { console.log(err) }
  // });

  // let product = {
  //   name: this.Form1.value.name,
  //   price: this.Form1.value.price,
  //   description: this.Form1.value.description,
  //   quantity: this.Form1.value.quantity,
  //   image: this.Form1.value.image,
  // };


  Form1 = new FormGroup({
    name: new FormControl(this.service.getProductByID(this.service.editproduct_id).subscribe(), Validators.required),
    price: new FormControl("", Validators.required),
    quantity: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    image: new FormControl(File)
  })

  base64: any = "";

  ngOnInit(): void {
    console.log(this.service.editproduct_id)
    console.log(this.productIdToUpdate)
  }

  imageSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      console.log(reader.result);
    }
    this.Form1.get("image")?.setValue(this.base64);
    console.log(this.Form1.value)

  }



  update() {

  }
}
