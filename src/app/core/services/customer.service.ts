import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, of } from 'rxjs';
import { Customer } from '../models/customer';
import { MessageService } from './message.service';
import { ApiService } from './api.service';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Injectable({
    providedIn: 'root'
})
export class CustomerService extends BehaviorSubject<GridDataResult> {
    public gridLoading: boolean;

    constructor(private messageService: MessageService, private apiService: ApiService) {
        super(null);
    }

    getCustomers(): Observable<Customer[]> {
        return this.apiService.get(`/Customer`);
    }

    // Get customers with grid state
    getCustomerGrid(gridState: DataSourceRequestState): Observable<GridDataResult> {
        return this.apiService.fetchgridpostJson('/Customer/showlist/', gridState);
    }

    // Get customer with grid state and loading
    getCustomerGridWithLoading(gridState: DataSourceRequestState) {
        this.gridLoading = true;
        return this.apiService.fetchgridpostJson('/Customer/showlist/', gridState).subscribe((x) => {
            super.next(x);
            this.gridLoading = false;
        });
    }

    // Get customer reports
    getCustomerReport(gridState: DataSourceRequestState, filterSet: any) {
        return this.apiService
            .fetchgrididpostJsonData('/Customer/report/', gridState, filterSet)
            .subscribe((reprtStatus) => {
                super.next(reprtStatus);
            });
    }

    getCustomer(id: number): Observable<Customer> {
        return this.apiService.get(`/Customer/${id}`);
    }

    addCustomer(customer: Customer): Observable<Customer> {
        return this.apiService.postJson('/Customer/AddCustomer', customer);
    }

    updateCustomer(customer: Customer): Observable<any> {
        return this.apiService.putJson(`/Customer/UpdateCustomer/${customer.Id}`, customer);
    }

    deleteCustomer(id: number): Observable<Customer> {
        return this.apiService.delete(`/Customer/DeleteCustomer/${id}`);
    }

    // Delete for single customer photo
    deleteCustomerPhoto(id: number, filename: string): Observable<string> {
        var encryptdata = btoa(id.toString());
        return this.apiService.postJson('/fileservice/Remove/CustomerPhoto/' + encryptdata, filename);
    }

    // Delete for multiple customer photo
    deleteMultiCustomerPhoto(id: number, filename: string): Observable<string> {
        var encryptdata = btoa(id.toString());
        return this.apiService.postJson('/multifileservice/RemoveDir/CustomerPhoto/' + encryptdata, filename);
    }

    // Get Single image file path
    getImagePath(id: number): Observable<string> {
        var encryptdata = btoa(id.toString());
        return this.apiService.get('/fileservice/Download/CustomerPhoto/' + encryptdata);
    }

    // Get Multiple image file path
    getMultiImagePath(id: number): Observable<string> {
        var encryptdata = btoa(id.toString());
        return this.apiService.get('/multifileservice/DownloadDir/CustomerPhoto/' + encryptdata);
    }

    searchCustomers(term: string): Observable<Customer[]> {
        if (!term.trim()) {
            return of([]);
        }
        return this.apiService.postJson('/Customer/search', { term: term });
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`CustomerService: ${message}`);
    }
}
