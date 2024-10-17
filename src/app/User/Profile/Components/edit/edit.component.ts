import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule],
  providers: [UserService],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  // userForm!: FormGroup;
  // userProfile: any;
  // userId!: number;

  // constructor(private userService: UserService, private formBuilder: FormBuilder,private router: Router) { }

  // ngOnInit(): void {
  //   // Retrieve userId from localStorage
  //   const storedUserId = localStorage.getItem('userId');
  //   if (storedUserId) {
  //     const userId = parseInt(storedUserId, 10); // Parse storedUserId to integer
  //     if (!isNaN(userId)) {
  //       // Call getUserById with the retrieved userId
  //       this.userService.getUserById(userId).subscribe(
  //         (data) => {
  //           this.userProfile = data;
  //           console.log(this.userProfile);
  //         },
  //         (error) => {
  //           console.error('Error fetching user profile:', error);
  //         }
  //       );
  //     } else {
  //       console.error('Stored userId is not a valid number:', storedUserId);
  //     }
  //   } else {
  //     console.error('No userId found in localStorage');
  //   }
  // }
  // // initForm(): void {
  // //   this.userForm = this.formBuilder.group({
  // //     name: ['', Validators.required],
  // //     email: ['', [Validators.required, Validators.email]],
  // //     phone: ['', Validators.required],
  // //     currentPassword: ['', Validators.required],
  // //     password: ['', Validators.required],
  // //     confirmPassword: ['', Validators.required],
  // //     address: ['', Validators.required]
  // //   });
  // // }



  // submitForm(): void {
  //   if (this.userForm.valid) {
  //     const storedUserId = localStorage.getItem('userId');
  //     if (storedUserId !== null) {
  //       const userId = parseInt(storedUserId, 10);
  //       const formData = this.userForm.value;
  //       this.userService.updateUser(userId, formData).subscribe(
  //         (data) => {
  //           // Handle success
  //           console.log('User updated successfully:', data);
  //           this.router.navigate(['/profile']);
  //         },
  //         (error) => {
  //           // Handle error
  //           console.error('Error updating user:', error);
  //         }
  //       );
  //     } else {
  //       console.error('User ID not found in localStorage');
  //     }
  //   }
  // }



  // cancelEdit(): void {
  //   this.router.navigate(['/profile']);
  // }

  userForm!: FormGroup;
  userProfile: any;
  userId!: number;
  showPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmNewPassword: boolean = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const userId = parseInt(storedUserId, 10);
      if (!isNaN(userId)) {
        this.userService.getUserById(userId).subscribe(
          (data) => {
            this.userProfile = data;
            console.log(this.userProfile);
            this.initForm();
          },
          (error) => {
            console.error('Error fetching user profile:', error);
          }
        );
      } else {
        console.error('Stored userId is not a valid number:', storedUserId);
      }
    } else {
      console.error('No userId found in localStorage');
    }
  }




  initForm(): void {
    this.userForm = this.formBuilder.group({
      name: [this.userProfile.name, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: [this.userProfile.email, [Validators.required, Validators.email]],
      phone: [this.userProfile.phone, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      password: [this.userProfile.password, Validators.required],
      address: [this.userProfile.address, Validators.required]
    },);
  }

  // passwordMatchValidator(formGroup: FormGroup) {
  //   const password = formGroup.get('password')?.value;
  //   const confirmPassword = formGroup.get('confirmPassword')?.value;

  //   if (password === confirmPassword) {
  //     return null;
  //   } else {
  //     return { passwordsNotMatch: true };
  //   }
  // }

  submitForm(): void {
    if (this.userForm.valid) {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId !== null) {
        const userId = parseInt(storedUserId, 10);
        const formData = this.userForm.value;
        this.userService.updateUser(userId, formData).subscribe(
          (data) => {
            console.log('User updated successfully:', data);
            alert("User updated successfully")
            this.router.navigate(['/profile']);
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
      } else {
        console.error('User ID not found in localStorage');
      }
    }
    else {
      alert(" الرجاء ملئ جميع الحقول مع مراعاة ان الاسم لا يقبل الا حروف و رقم التليفون 11 رقم");
    }
  }
  cancelEdit(): void {
    this.router.navigate(['/profile']);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // toggleNewPasswordVisibility(): void {
  //   this.showNewPassword = !this.showNewPassword;
  // }

  // toggleConfirmNewPasswordVisibility(): void {
  //   this.showConfirmNewPassword = !this.showConfirmNewPassword;
  // }

}
