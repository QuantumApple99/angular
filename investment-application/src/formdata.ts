export interface investmentData{
    initialInvestment: number,
    annualInvestment: number,
    expectedReturn: number,
    duration: number
}

export interface returnData{
    year: number,
    interest: number,
    valueEndOfYear: number,
    annualInvestment: number,
    totalInterest: number,
    totalAmountInvested: number
}

export interface investmentDetails{
    valueEndOfYear: number,
    totalInterest: number,
    totalAmountInvested: number,
    annualInvestment: number
}