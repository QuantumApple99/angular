import { Injectable } from "@angular/core";
import { investmentData, returnData } from "./formdata";

@Injectable({providedIn: 'root'})
export class InvestmentService {

    annualData: returnData[] = [];

    calculateInvestmentResults(investmentForm: investmentData){
        var initialInvestment = investmentForm.initialInvestment;
        var annualInvestment = investmentForm.annualInvestment;
        var expectedReturn = investmentForm.expectedReturn;
        var duration = investmentForm.duration;

        var investmentValue = initialInvestment;

        for (let i = 0; i < duration; i++) {
            const year = i + 1;
            const interestEarnedInYear = investmentValue * (expectedReturn / 100);
            investmentValue += interestEarnedInYear + annualInvestment;
            const totalInterest = investmentValue - annualInvestment * year - initialInvestment;

            var tempResult: returnData = {
                year: year,
                interest: interestEarnedInYear,
                valueEndOfYear: investmentValue,
                annualInvestment: annualInvestment,
                totalInterest: totalInterest,
                totalAmountInvested: initialInvestment + annualInvestment * year
            }

            this.annualData.push(tempResult);
          }

    }

    displayResult(){
        console.log(this.annualData);
        return this.annualData;
    }
}