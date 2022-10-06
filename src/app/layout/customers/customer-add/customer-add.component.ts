import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

import { Customer } from '../../../core/models/customer';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerType } from '../../../core/models/customerType';
import { CustomerTypeService } from '../../../core/services/customer-type.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-customer-add',
    templateUrl: './customer-add.component.html',
    styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {
    customers: Customer[] = [];
    customerTypes: CustomerType[];
    selectedCustomerType: number;
    tempdir: string='-';
    uploadSaveUrl: string = '';
    uploadRemoveUrl: string = '';

    newCustomer = this.fb.group({
        Id: [0],
        CustomerName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
        RegisterDate: [new Date()],
        CustomerAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        Inactive: [false],
        CustomerTypeId: [1],
        CustomerPhoto: ['']
    });

    constructor(
        private customerService: CustomerService,
        private customerTypeService: CustomerTypeService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.uploadSaveUrl = `${environment.multi_file_api_url}` + '/Upload/TempDir';
        this.uploadRemoveUrl = `${environment.multi_file_api_url}` + '/Upload/TempRemoveDir';
        this.customerTypeService.getCustomerTypes().subscribe((cusTypes) => (this.customerTypes = cusTypes));
    }

    addNewCustomer(): void {
        if (this.newCustomer.value.CustomerPhoto != null) {
            this.newCustomer.patchValue({ CustomerPhoto: this.tempdir });
        }
        var regDate = new Date(
            this.newCustomer.value.RegisterDate.getTime() -
                this.newCustomer.value.RegisterDate.getTimezoneOffset() * 60000
        );
        this.newCustomer.patchValue({ RegisterDate: regDate });
        this.customerService.addCustomer(this.newCustomer.getRawValue()).subscribe((newCus) => {
            if (newCus !== undefined) {
                this.router.navigate(['/customers']);
            }
        });
    }

    public uploadEventHandler(e) {
        e.data = { tempdir: this.tempdir };
    }

    public removeEventHandler(e) {
        e.data = { tempdir: this.tempdir };
    }

    public successEventHandler(e) {
        if (e.operation == 'upload') {
            this.tempdir = e.response.body;
        }
    }

    goBack(): void {
        this.location.back();
    }
}
