import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  providers: [UserService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  showPassword: boolean = false;
  userProfile: any;
  userId!: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const userId = parseInt(storedUserId, 10);
      if (!isNaN(userId)) {
        this.userService.getUserById(userId).subscribe(
          (data) => {
            this.userProfile = data;
            console.log(this.userProfile);
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

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
