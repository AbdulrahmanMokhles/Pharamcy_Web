import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { SignupService } from './Service/signup.service';
import { LoginService } from '../login/Service/login.service';
import { CartService } from '../cart.service';
import { AlertDialogComponent } from '../../Shared/Components/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule],
  providers: [SignupService, LoginService, CartService]
})
export class SignUpComponent {
  name: string = '';
  password: string = '';
  email: string = '';
  address: string = '';
  phone: string = '';
  errorMessage: string = '';
  userid!: number;
  isLoading: boolean = false;
  display: boolean = false;
  passwordField?: HTMLInputElement;
  constructor(private dialog: MatDialog, private router: Router, private signupsevice: SignupService, private userService: LoginService, private cartService: CartService) { }
  block: string = 'none';
  myform = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.pattern(/^[\u0600-\u06FFa-zA-Zs]{6,}$/)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z0-9!@#$%^&*()-_+=])[a-zA-Z0-9!@#$%^&*()-_+=]{8,}$/)]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern(/^(010|011|012|015)\d{8}$/)
    ]),
    address: new FormControl("", [Validators.required])
  })
  get namevalid() {
    this.display = !this.myform.controls['name'].valid;
    return this.myform.controls['name'].valid;
    // 
  }
  get emailvalid() {
    return this.myform.controls['email'].valid;
    // this.display=true;
  }
  get passwardvalid() {
    return this.myform.controls['password'].valid;
    // this.display=true;
  }
  get addressvalid() {
    return this.myform.controls['address'].valid;
    // this.display=true;
  }
  get phonevalid() {
    return this.myform.controls['phone'].valid;
    // this.display=true;
  }

  onSubmit() {
    const userData: any = {
      "name": this.name,
      "email": this.email,
      "password": this.password,
      "phone": this.phone,
      "address": this.address
    };

    if (this.myform.valid) {
      this.isLoading = true;
      // Check if email exists
      this.signupsevice.existEmail(this.email).subscribe(
        (emailExists) => {
          if (!emailExists) {
            // If email does not exist, create user
            // this.signupsevice.createUser(userData).subscribe(
            //   (response) => {
            //     console.log('User created successfully:', response);
            //     // Handle success response
            //     this.router.navigate(['/Cart2']);
            //     this.isLoading = false;
            //   },
            //   (error) => {
            //     console.error('Error creating user:', error);
            //     this.isLoading = false;
            //     this.errorMessage = 'User registration failed. Please try again.';
            //   }
            // );
            this.signupsevice.registerUser(userData).subscribe(
              (response) => {
                console.log(userData);
                this.userService.loginUser(this.email, this.password).subscribe(
                  (response) => {
                    this.isLoading = false;
                    this.userid = response.id;

                    this.userService.login(response.id);
                    console.log(response.id); // Print the user ID here
                    this.router.navigate(['/Login']);
                    this.isLoading = false;





                    this.cartService.createCartForUser(this.userid).subscribe(
                      (cartResponse) => {
                        console.log('Cart created successfully:', cartResponse);
                        // Navigate to Cart2 page
                        // this.router.navigate(['/Cart2']);
                      },
                      (error) => {
                        console.error('Error creating cart:', error);
                      }
                    );

                  },
                  (error) => {
                    this.isLoading = false;
                    this.errorMessage = 'Login failed. Please check your credentials.';
                  }
                );


                // Handle success response
              },
              (error) => {
                this.errorMessage = 'Error registering user:' + error;
                this.isLoading = false;
                // Handle error response
              }
            );
          } else {
            console.log('Email already exists');

            this.errorMessage = 'Email already exists. Please use a different email.';
            this.openAlertDialog("الايميل موجود مسبقا");
            this.isLoading = false;
          }
        },
        (error) => {
          console.error('Error checking email:', error);
          this.isLoading = false;
          this.errorMessage = 'User registration failed. Please try again.';
        }
      );
    } else {
      // Form is not valid, display error or take appropriate action
      this.block = 'block';
    }
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


  showHidePassword(passwordField: HTMLInputElement | undefined) {
    if (passwordField) {
      passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
    }
  }
  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}