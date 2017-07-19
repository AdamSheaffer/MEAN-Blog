import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  messageClass: String;
  message: String;
  isProcessing = false;

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  constructor(private formBuilder: FormBuilder) { }

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
  }
}
