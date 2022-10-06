import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';

import { Customer } from '../../../core/models/customer';
import { CustomerService } from '../../../core/services/customer.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-customer-list-dialog',
    templateUrl: './customer-list-dialog.component.html',
    styleUrls: ['./customer-list-dialog.component.scss']
})
export class CustomerListDialogComponent implements OnInit {
    public customergrid: Observable<GridDataResult>;
    itemToRemove: any;
    customerDataItem: Customer;
    public isNew: boolean;

    public gridState: DataSourceRequestState = {
        skip: 0,
        take: 5,
        filter: { logic: 'and', filters: [] }
    };

    constructor(private customerService: CustomerService, private router: Router) {}

    ngOnInit(): void {
        const currentState = localStorage.getItem('ListCusDialogState');
        if (currentState !== null) {
            this.gridState = JSON.parse(currentState);
        } else {
            localStorage.setItem('ListCusDialogState', JSON.stringify(this.gridState));
        }
        this.getCustomers();
    }

    // Get customer with loading time
    getCustomers(): void {
        this.customergrid = this.customerService;
        this.customerService.getCustomerGridWithLoading(this.gridState);
    }

    onStateChange(dstate: DataStateChangeEvent): void {
        this.gridState = dstate;
        localStorage.setItem('ListCusDialogState', JSON.stringify(this.gridState));
        this.getCustomers();
    }

    public addHandler({ sender }) {
        this.isNew = true;
        this.customerDataItem = new Customer();
    }

    public editHandler({ sender, rowIndex, dataItem }) {
        this.isNew = false;
        this.customerDataItem = dataItem;
    }

    public cancelHandler() {
        this.customerDataItem = undefined;
    }

    public saveHandler(customer: Customer) {
        if (this.isNew) {
            this.customerService.addCustomer(customer).subscribe((recustomer) => {
                this.getCustomers();
            });
        } else {
            this.customerService.updateCustomer(customer).subscribe((recustomer) => {
                this.getCustomers();
            });
        }
        this.customerDataItem = undefined;
    }

    public removeHandler({ dataItem }) {
        this.itemToRemove = dataItem;
    }

    public confirmRemove(shouldRemove: boolean): void {
        if (shouldRemove) {
            this.customerService.deleteCustomer(this.itemToRemove.Id).subscribe((deletestatus) => {
                this.getCustomers();
            });
        }
        this.itemToRemove = null;
    }
}
