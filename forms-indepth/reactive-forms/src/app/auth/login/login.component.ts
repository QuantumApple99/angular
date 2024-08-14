import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function containsQuestionMark(control: AbstractControl){
  if(control.value.includes('?')){
    return null;
  }

  return { customValidatorFailed: true }
}

function emailUnique(control: AbstractControl){
  if(control.value.email === 'test@example.com'){
    return of(null)
  }

  return of({ customAsyncValidatorFalse: true })
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), containsQuestionMark]
    })
  })

  ngOnInit(){
    const savedFormData = window.localStorage.getItem('formData');

    if(savedFormData){
      const savedData = JSON.parse(savedFormData);
      this.form.setValue({
        email: savedData.email,
        password: ''
      })
    }


    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem('formData', JSON.stringify({ email: value.email }));
      }
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  get isEmailInvalid(){
    return this.form.controls.email.invalid && this.form.controls.email.touched && this.form.controls.email.dirty;
  }

  get isPasswordInvalid(){
    return this.form.controls.password.invalid && this.form.controls.password.touched && this.form.controls.password.dirty;
  }

  onSubmit(){
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;

    console.log(enteredEmail, enteredPassword);
  }
}
