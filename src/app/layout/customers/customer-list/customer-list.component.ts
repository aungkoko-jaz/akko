import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';

import { Customer } from '../../../core/models/customer';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
    public customergrid: GridDataResult;
    public gridState: DataSourceRequestState = {
        skip: 0,
        take: 10,
        filter: { logic: 'and', filters: [] }
    };

    constructor(private customerService: CustomerService, private router: Router) {}

    ngOnInit(): void {
        const currentState = localStorage.getItem('ListCustomerState');
        if (currentState != null) {
            this.gridState = JSON.parse(currentState);
        } else {
            localStorage.setItem('ListCustomerState', JSON.stringify(this.gridState));
        }
        this.getCustomers();
    }

    getCustomers(): void {
        this.customerService
            .getCustomerGrid(this.gridState)
            .subscribe((recustomer) => (this.customergrid = recustomer));
    }

    delete(Customer: Customer): void {
        this.customerService.deleteCustomer(Customer.Id).subscribe((deleteStatus) => {
            this.getCustomers();
        });
    }

    detail(Customer: Customer): void {
        this.router.navigate([`/customers/detail/${Customer.Id}`]);
    }

    onStateChange(dstate: DataStateChangeEvent): void {
        this.gridState = dstate;
        localStorage.setItem('ListCustomerState', JSON.stringify(this.gridState));
        this.getCustomers();
    }
}
