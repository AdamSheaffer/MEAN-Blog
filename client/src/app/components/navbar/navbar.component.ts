import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private msgService: FlashMessagesService) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
    this.msgService.show('You are now logged out', { cssClass: 'alert alert-info' });
    this.router.navigate(['/']);
  }
}
