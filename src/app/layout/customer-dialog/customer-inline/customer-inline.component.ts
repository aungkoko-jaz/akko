import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IntlService } from '@progress/kendo-angular-intl';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';

import { Customer } from '../../../core/models/customer';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerType } from '../../../core/models/customerType';
import { CustomerTypeService } from '../../../core/services/customer-type.service';

@Component({
    selector: 'app-customer-inline',
    templateUrl: './customer-inline.component.html',
    styleUrls: ['./customer-inline.component.scss']
})
export class CustomerInlineComponent implements OnInit {
    public customergrid: GridDataResult;
    // public selectCustomerItem: number;
    public itemToRemove: any;
    public customerDataItem: Customer;
    public isNew: boolean;
    public customerFormGroup: FormGroup;
    public editRowIndex: number;
    public customerTypes: CustomerType[];

    public gridState: DataSourceRequestState = {
        skip: 0,
        take: 10,
        filter: { logic: 'and', filters: [] }
    };

    constructor(
        private customerService: CustomerService,
        private customerTypeService: CustomerTypeService,
        private router: Router,
        private intl: IntlService
    ) {}

    ngOnInit(): void {
        const currentState = localStorage.getItem('ListCusInlineState');
        if (currentState !== null) {
            this.gridState = JSON.parse(currentState);
        } else {
            localStorage.setItem('ListCusInlineState', JSON.stringify(this.gridState));
        }
        this.customerTypeService.getCustomerTypes().subscribe((cusTypes) => (this.customerTypes = cusTypes));
        this.getCustomers();
    }

    getCustomers(): void {
        this.customerService
            .getCustomerGrid(this.gridState)
            .subscribe((recustomer) => (this.customergrid = recustomer));
    }

    private closeEditor(grid, rowIndex = this.editRowIndex) {
        grid.closeRow(rowIndex);
        this.editRowIndex = undefined;
        this.customerFormGroup = undefined;
    }

    public addHandler({ sender }) {
        this.closeEditor(sender);

        this.customerFormGroup = new FormGroup({
            CustomerName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
            RegisterDate: new FormControl(new Date()),
            CustomerAddress: new FormControl(''),
            CustomerTypeId: new FormControl(0)
        });
        sender.addRow(this.customerFormGroup);
    }

    public editHandler({ sender, rowIndex, dataItem }) {
        this.closeEditor(sender);
        this.customerFormGroup = new FormGroup({
            Id: new FormControl(dataItem.Id),
            CustomerName: new FormControl(dataItem.CustomerName, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(20)
            ]),
            RegisterDate: new FormControl(
                this.intl.parseDate(this.intl.formatDate(dataItem.RegisterDate, 'yyyy-MM-dd'))
            ),
            CustomerAddress: new FormControl(dataItem.CustomerAddress),
            CustomerTypeId: new FormControl(dataItem.CustomerTypeId)
        });
        this.editRowIndex = rowIndex;
        sender.editRow(rowIndex, this.customerFormGroup);
    }

    public cancelHandler({ sender, rowIndex }) {
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({ sender, rowIndex, formGroup, isNew }) {
        var regDate = new Date(
            this.customerFormGroup.value.RegisterDate.getTime() -
                this.customerFormGroup.value.RegisterDate.getTimezoneOffset() * 60000
        );
        this.customerFormGroup.patchValue({ RegisterDate: regDate });

        if (isNew) {
            this.customerService.addCustomer(this.customerFormGroup.value).subscribe((recustomer) => {
                this.getCustomers();
            });
        } else {
            this.customerService
                .updateCustomer(this.customerFormGroup.value)
                .subscribe((recustomer) => this.getCustomers());
        }
        sender.closeRow(rowIndex);
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

    onStateChange(dstate: DataStateChangeEvent): void {
        this.gridState = dstate;
        localStorage.setItem('ListCusInlineState', JSON.stringify(this.gridState));
        this.getCustomers();
    }
}
