import { Component, output } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { InputComponent } from '../input/input.component';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, InputComponent, ResultsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {

  outputResult: boolean = false;

  displayResult(){
    this.outputResult = true;
  }
}
