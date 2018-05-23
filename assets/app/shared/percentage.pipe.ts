import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'Percentage'
})
export class PercentagePipe implements PipeTransform{
    transform(value: number, exponent: string): number {
        let exp = parseFloat(exponent);
        return value * exp;
    }
}