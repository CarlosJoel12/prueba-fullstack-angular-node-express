import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeyLocalStorage } from 'src/app/shared/enums/keysLocalStorage.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.removeItem(KeyLocalStorage.token);
    this.router.navigate(['/login']);
  }
}
