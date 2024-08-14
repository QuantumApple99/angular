import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function equalValues(control: AbstractControl){
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if(password === confirmPassword){
    return null;
  }

  return { passwordsNotEqual: true }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})

export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      })
    }, {
      validators: [equalValues]
    }),
    firstName: new FormControl('', {
      validators: [Validators.required]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required]
    }),
    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required]
      }),
      number: new FormControl('', {
        validators: [Validators.required]
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required]
      }),
      city: new FormControl('', {
        validators: [Validators.required]
      })
    }),
    role: new FormControl('student', {
      validators: [Validators.required]
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agreed: new FormControl(false, {
      validators: [Validators.required]
    })
  })

  get isEmailInvalid(){
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid
  }

  get isPasswordInvalid(){
    return this.form.controls.passwords.controls.password.touched && this.form.controls.passwords.controls.password.dirty && this.form.controls.passwords.controls.password.invalid
  }

  get passwordsMatch(){
    return this.form.value.passwords?.password!==this.form.value.passwords?.confirmPassword
  }

  onSubmit(){
    if(this.form.invalid){
      console.log('Invalid Form');
      return
    }
    console.log(this.form.value.email);
    console.log(this.form.value.passwords);
    console.log(this.form);
  }

  onReset(){
    this.form.reset();
  }
}
