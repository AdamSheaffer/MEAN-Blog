import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isProcessing = false;

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: FlashMessagesService) {
    this.createForm();
  }

  ngOnInit() {
  }

  disableForm() {
    Object.keys(this.form.controls).forEach(f => this.form.controls[f].disable());
  }

  enableForm() {
    Object.keys(this.form.controls).forEach(f => this.form.controls[f].enable());
  }

  onLoginSubmit() {
    this.isProcessing = true;
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    this.authService.login(user).subscribe(data => {
      if (!data.success) {
        this.msgService.show(data.message, { cssClass: 'alert alert-danger' });
        this.isProcessing = false;
        this.enableForm();
      } else {
        this.msgService.show(data.message, { cssClass: 'alert alert-success' });
        this.authService.storeUserData(data.token, data.user);
        this.disableForm();
        this.router.navigate([`${this.authService.redirectUrl || '/profile'}`]);
      }
    });
  }
}
