import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { Observable, of } from 'rxjs';

import { CustomerType } from '../../../core/models/customerType';
import { CustomerTypeService } from '../../../core/services/customer-type.service';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
    selector: 'app-customer-report',
    templateUrl: './customer-report.component.html',
    styleUrls: ['./customer-report.component.scss']
})
export class CustomerReportComponent implements OnInit {
    public reportgrid: Observable<GridDataResult>;
    public showSearchStr: string = 'Show Filter';
    public isSearchOpened: boolean = false;
    public customertypes: CustomerType[];

    public gridState: State = {
        sort: [{ field: 'ID', dir: 'asc' }],
        skip: 0,
        take: 10,
        filter: { logic: 'and', filters: [] }
    };

    reportForm = this.fb.group({
        CustomerName: [''],
        CustomerTypeId: [''],
        FromDate: [''],
        ToDate: ['']
    });

    constructor(
        private fb: FormBuilder,
        private customerTypeService: CustomerTypeService,
        private customerService: CustomerService,
        @Inject(LOCALE_ID) private locale: string
    ) {}

    ngOnInit(): void {
        this.customerTypeService.getCustomerTypes().subscribe((cusTypes) => (this.customertypes = cusTypes));
        this.reportgrid = this.customerService;

        const currentState = JSON.parse(localStorage.getItem('CusReportState'));
        if (currentState != null) {
            if (currentState.FromDate != null && currentState.FromDate != '') {
                currentState.FromDate = new Date(currentState.FromDate);
            }
            if (currentState.ToDate != null && currentState.ToDate != '') {
                currentState.ToDate = new Date(currentState.ToDate);
            }
            this.reportForm.reset(currentState);
        } else {
            localStorage.setItem('CusReportState', JSON.stringify(this.reportForm.value));
        }
        this.Search();
    }

    // Search wtih filter data
    public Search(): void {
        localStorage.setItem('CusReportState', JSON.stringify(this.reportForm.value));
        if (this.reportForm.value.FromDate != null && this.reportForm.value.FromDate != '') {
            this.reportForm.value.FromDate = formatDate(this.reportForm.value.FromDate, 'yyyy-MM-dd', this.locale);
        }
        if (this.reportForm.value.ToDate != null && this.reportForm.value.ToDate != '') {
            this.reportForm.value.ToDate = formatDate(this.reportForm.value.ToDate, 'yyyy-MM-dd', this.locale);
        }
        this.customerService.getCustomerReport(this.gridState, this.reportForm.value);
    }

    // Search All or Clear Filter or Default State
    public Clear() {
        this.reportForm.reset();
        localStorage.removeItem('CusReportState');
        this.customerService.getCustomerReport(this.gridState, this.reportForm.value);
    }

    public showSearch(isOpened) {
        if (isOpened == false) {
            this.isSearchOpened = true;
            this.showSearchStr = 'Hide Filter';
        } else {
            this.isSearchOpened = false;
            this.showSearchStr = 'Show Filter';
        }
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.gridState = state;
        this.Search();
    }
}
