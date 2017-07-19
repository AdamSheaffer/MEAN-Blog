import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message: String;
  messageClass: String;
  isProcessing = false;

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

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private disableForm() {
    ['username', 'email', 'password', 'confirm'].forEach(f => this.form.controls[f].disable());
  }

  private enableForm() {
    ['username', 'email', 'password', 'confirm'].forEach(f => this.form.controls[f].enable());
  }

  onRegisterSubmit() {
    this.isProcessing = true;
    const user = ['username', 'email', 'password'].reduce((user, field) => {
      user[field] = this.form.get(field).value;
      return user;
    }, {});

    this.authService.registerUser(user).subscribe(res => {
      if (res.success) {
        this.messageClass = 'alert alert-success';
        this.disableForm();
      } else {
        this.messageClass = 'alert alert-danger';
        this.enableForm();
        this.isProcessing = false;
      }
      this.message = res.message;
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
