import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { investmentData } from '../formdata';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  @Output() resultDisplay = new EventEmitter();

  initialInvestment!: number;
  annualInvestment!: number;
  expectedReturn!: number;
  duration!: number;

  private investmentService = inject(InvestmentService);

  displayResult(){
    var submit: investmentData = {
      initialInvestment: this.initialInvestment,
      annualInvestment: this.annualInvestment,
      expectedReturn: this.expectedReturn,
      duration: this.duration
    }

    this.investmentService.calculateInvestmentResults(submit);

    this.resultDisplay.emit();

    this.initialInvestment = 0;
    this.annualInvestment = 0;
    this.expectedReturn = 0;
    this.duration = 6;
  }

}
