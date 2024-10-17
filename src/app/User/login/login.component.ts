import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from './Service/login.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormsModule, CommonModule, HttpClientModule],
  providers: [LoginService, UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  password: string = '';
  email: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  block: string = 'none';
  userid!: number;

  showPassword: boolean = false;
  passwordField?: HTMLInputElement;
  constructor(private userService: LoginService, private router: Router, private userService1: UserService) { }

  myform = new FormGroup({
    password: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required)
  });
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // showHidePassword(passwordField: HTMLInputElement | undefined) {
  //   if (passwordField) {
  //     // Check if a passwordField element is passed and is not undefined
  //     passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
  //     // Toggle the type attribute of the passwordField between 'password' and 'text'
  //   }
  // }


  login() {
    this.isLoading = true;
    if (this.myform.valid) {
      this.userService.loginUser(this.email, this.password).subscribe(
        (response) => {
          this.isLoading = false;
          this.userid = response.id;
          this.userService.login(response.id);
          // console.log(response.id); // Print the user ID here
          this.router.navigate(['/home', { userId: response.id }]);
          window.location.reload();
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      );
    } else {
      // Form is not valid, display error or take appropriate action
      this.block = 'block';
    }
  }
}