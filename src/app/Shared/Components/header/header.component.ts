import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../../../User/login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  public userid: any;


  isNavbarVisible: boolean = false;
  toggleNavbar() {
    this.isNavbarVisible = !this.isNavbarVisible;
  }
  isFormVisible: boolean = false;

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }

  isHomePage: boolean = false;
  isStorePage: boolean = false;
  isProfilePage: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem("userId");
    console.log(this.userid);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = event.url === '/home';
        this.isStorePage = event.url === '/store';
        this.isProfilePage = event.url !== '/home' && event.url !== '/store';
      }
    });
  }

  // checkuser() {
  //   let user = (localStorage.getItem("userId"));
  //   this.userid = user;
  // }

  // login() {
  //   this.router.navigate([LoginComponent])
  // }

  logut() {
    localStorage.setItem("userId", "0");
    // this.router.navigate([LoginComponent]);
    window.location.reload();
  }

}


