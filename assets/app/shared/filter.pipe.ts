import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

    transform(users: any, term: any): any {
        //check if search term is undefined
        if(term === undefined){
            return users;
        }
        //return updated users array
        return users.filter(function(users){
            return users.firstNametoLowerCase().includes(term.toLowerCase());
        })
    }

}
