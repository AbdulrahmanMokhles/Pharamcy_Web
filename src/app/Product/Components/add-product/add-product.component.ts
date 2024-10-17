import { Component, Inject, input } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
<<<<<<< HEAD
import { FormControl, FormGroup, Validators } from '@angular/forms';
=======
import { AlertDialogComponent } from '../../../Shared/Components/alert-dialog/alert-dialog.component';

>>>>>>> 5a60fe8 (first commit)

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [HttpClientModule,
    ReactiveFormsModule],
  providers: [ProductsService],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  constructor(
    private dialog: MatDialog,
    private service: ProductsService,
    private http: HttpClient,
    private fb: FormBuilder) { }
  // Form1!: FormGroup;

<<<<<<< HEAD
  Form1 = new FormGroup({
    name : new FormControl("",Validators.required),
    price : new FormControl("",Validators.required),
    quantity : new FormControl("",Validators.required),
    description : new FormControl("",Validators.required),
  })

  public description: any = "";
=======
  base64: any = "";

  Form1 = new FormGroup({
    name: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    quantity: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    image: new FormControl(File)
  })


  // ngOnIt() {
  //   console.log(this.data)
  // }
>>>>>>> 5a60fe8 (first commit)

  imagefilename = "";


  Add() {
    // console.log(this.Form1.value);
    let newproduct = {
      name: this.Form1.value.name,
      price: this.Form1.value.price,
      description: this.Form1.value.description,
      quantity: this.Form1.value.quantity,
      image: this.Form1.value.image,
    };
    console.log(newproduct);
    this.service.AddProduct(newproduct).subscribe()
    // alert("تم اضافة المنتج بنجاح");
    this.openAlertDialog("تم اضافة المنتج بنجاح");
  }

<<<<<<< HEAD
  // Add(name: any, price: any, description: any, quantity: any) {
  //   // let image : any = this.imagefilename

  //   const formdata = new FormData();
  //   let image = formdata.append("image", this.imagefilename);
  //   let newproduct = { name, price, description, quantity, image };
  //   console.log(newproduct);
  //   this.service.AddProduct(newproduct).subscribe();
  // }

  Add() {
=======
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


  imageSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      // console.log(this.base64)
      this.Form1.get("image")?.setValue(this.base64);
      // console.log(this.Form1.value)
    }
>>>>>>> 5a60fe8 (first commit)

  }

}
