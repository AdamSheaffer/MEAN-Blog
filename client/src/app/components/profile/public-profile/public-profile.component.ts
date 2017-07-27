import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages/module';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {
  user: any

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private msgService: FlashMessagesService) { }

  ngOnInit() {
    const username = this.activatedRoute.snapshot.params['username'];
    this.authService.getPublicProfile(username).subscribe(data => {
      if (!data.success) {
        this.msgService.show(data.message, { cssClass: 'alert alert-danger' });
      } else {
        this.user = data.user;
      }
    });
  }

}
