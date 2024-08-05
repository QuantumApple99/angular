import { input, Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temp',
    standalone: true,
})

export class TemperaturePipe implements PipeTransform{
    transform(value: number | string | null, inputSymbol: string, outputSymbol?: string) {

        if(!value){
            return value;
        }

        var val: number;
        var symbol: string;

        if(typeof value === 'string'){
            val = parseFloat(value);
        }
        else{
            val = value;
        }

        if(inputSymbol === 'C' && outputSymbol === 'F'){
            val = (val * (9/5)) + 32;
            symbol = 'F'
        }
        else if(inputSymbol === 'F' && outputSymbol === 'C'){
            val = (val - 32) * (5/9);
            symbol = 'C'
        }
        else{
            val = val;
            symbol = inputSymbol;
        }

        return `${val.toFixed(2)} ${symbol}`;
    }

}