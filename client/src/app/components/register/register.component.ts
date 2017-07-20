import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  isProcessing = false;
  isUniqUsername = true;
  usernameUniqMessage: String;

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(35)
      ])],
      confirm: ['', Validators.required],
    }, { validator: this.matchingPasswords('password', 'confirm') });
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

  checkUsername() {
    const username = this.form.get('username').value;
    if (!username || !username.trim().length) return;
    this.authService.checkUsername(username).subscribe(data => {
      this.isUniqUsername = data.success;
      this.usernameUniqMessage = data.success ? '' : data.message;
    });
  }

  onRegisterSubmit() {
    this.isProcessing = true;
    const user = ['username', 'email', 'password'].reduce((user, field) => {
      user[field] = this.form.get(field).value;
      return user;
    }, {});

    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.msgService.show(data.message, { cssClass: 'alert alert-success' });
        this.disableForm();
        this.router.navigate(['/login']);
      } else {
        this.msgService.show(data.message, { cssClass: 'alert alert-danger' });
        this.enableForm();
        this.isProcessing = false;
      }
    });

  }

  // Validation
  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    }
    return { 'validateEmail': true };
  }

  validateUsername(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test username against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validateUsername': true }; // Return as invalid username
    }
  }

  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      }
      return { matchingPasswords: true };
    }
  }
}
