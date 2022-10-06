import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomerType } from '../models/customerType';
import { ApiService } from './api.service';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerTypeService {
    constructor(private apiService: ApiService, private messageService: MessageService) {}

    getCustomerTypes(): Observable<CustomerType[]> {
        return this.apiService.get('/CustomerType');
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    private log(message: string) {
        this.messageService.add(`CustomerService: ${message}`);
    }
}
