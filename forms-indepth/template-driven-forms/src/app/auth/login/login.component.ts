import { afterNextRender, Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('form')formData !: NgForm
  private destroyRef = inject(DestroyRef);

  constructor(){
    afterNextRender(() => {
      const savedFormData = window.localStorage.getItem('storedEmail');

      if(savedFormData){
        const savedData = JSON.parse(savedFormData)

        setTimeout(() => {
          this.formData.setValue({
            email: savedData.email,
            password: ''
          })
        }, 1);
      }

      const subscription = this.formData.valueChanges?.pipe(debounceTime(1000)).subscribe({
        next: (value) => {
          console.log(value);
          window.localStorage.setItem('storedEmail', JSON.stringify({ 'email': value.email}));
        }
      })

      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      })
    })
  }

  onSubmit(){
    if(this.formData.form.invalid){
      return;
    }
      
    const enteredEmail = this.formData.form.value.email;
    const enteredPassword = this.formData.form.value.password;

    console.log(enteredEmail);
    console.log(enteredPassword);

    this.formData.form.reset();
  }
}
