import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IntlService } from '@progress/kendo-angular-intl';
import { EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { CustomerType } from '../../../core/models/customerType';
import { CustomerTypeService } from '../../../core/services/customer-type.service';
import { Customer } from '../../../core/models/customer';
import { CustomerService } from '../../../core/services/customer.service';

import { Globalfunction } from '../../../core/global/globalfunction';

@Component({
    selector: 'app-customer-detail-dialog',
    templateUrl: './customer-detail-dialog.component.html',
    styleUrls: ['./customer-detail-dialog.component.scss']
})
export class CustomerDetailDialogComponent implements OnInit {
    customerTypes: CustomerType[];
    customerFormGroup: FormGroup;
    active = false;
    previewimage: string;
    photoToRemove: string;
    uploadSaveUrl: string = '';
    uploadRemoveUrl: string = '';
    tempimage: string = '';
    public globalfunction: Globalfunction = new Globalfunction();

    @Input() public isNew = false;
    @Input() public set model(customerObj: Customer) {
        if (customerObj !== undefined) {
            this.previewimage = null;
            if (customerObj.Id == undefined) {
                this.customerFormGroup = new FormGroup({
                    CustomerName: new FormControl('', [
                        Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(20)
                    ]),
                    RegisterDate: new FormControl(new Date()),
                    CustomerAddress: new FormControl('', [Validators.minLength(5), Validators.maxLength(50)]),
                    CustomerTypeId: new FormControl(0),
                    CustomerPhoto: new FormControl('')
                });
            } else {
                // For Editing
                this.customerFormGroup = new FormGroup({
                    Id: new FormControl(customerObj.Id),
                    CustomerName: new FormControl(customerObj.CustomerName),
                    RegisterDate: new FormControl(
                        this.intl.parseDate(this.intl.formatDate(customerObj.RegisterDate, 'yyyy-MM-dd'))
                    ),
                    CustomerAddress: new FormControl(customerObj.CustomerAddress),
                    CustomerTypeId: new FormControl(customerObj.CustomerTypeId),
                    CustomerPhoto: new FormControl(customerObj.CustomerPhoto)
                });

                this.customerService.getImagePath(customerObj.Id).subscribe((reimage) => {
                    this.previewimage = reimage;
                });
            }
        }
        this.active = customerObj !== undefined;
    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Customer> = new EventEmitter();

    constructor(
        private customerTypeService: CustomerTypeService,
        private customerService: CustomerService,
        private intl: IntlService
    ) {}

    ngOnInit(): void {
        this.uploadSaveUrl = `${environment.file_api_url}` + '/Upload/Temp';
        this.uploadRemoveUrl = `${environment.file_api_url}` + '/Upload/TempRemove';
        this.customerTypeService.getCustomerTypes().subscribe((recustomer) => (this.customerTypes = recustomer));
    }

    public onSave(e): void {
        if (this.customerFormGroup.value.CustomerPhoto != null) {
            this.customerFormGroup.patchValue({
                CustomerPhoto: this.tempimage
            });
        }
        var regDate = new Date(
            this.customerFormGroup.value.RegisterDate.getTime() -
                this.customerFormGroup.value.RegisterDate.getTimezoneOffset() * 60000
        );
        this.customerFormGroup.patchValue({ RegisterDate: regDate });
        this.save.emit(this.customerFormGroup.getRawValue());
        this.active = false;
    }

    public successEventHandler(e) {
        if (e.operation == 'upload') this.tempimage = e.response.body;
    }

    // Image upload
    public uploadEventHandler(e) {
        console.log('upload event');
        e.data = {
            enFile: this.globalfunction.encryptData(e.files[0].name)
        };
    }

    // To clear temp file
    public removeEventHandler(e) {
        e.files[0].name = this.tempimage;
    }

    public deleteImageHandler(e) {
        this.photoToRemove = 'CustomerPhoto';
        e.preventDefault();
    }

    public confirmPhotoRemove(shouldRemove: boolean): void {
        if (shouldRemove) {
            this.customerService
                .deleteCustomerPhoto(this.customerFormGroup.value.Id, this.photoToRemove)
                .subscribe((deletestatus) => {
                    delete this.previewimage[this.photoToRemove];
                    this.photoToRemove = null;
                    this.previewimage = null;
                });
        } else {
            this.photoToRemove = null;
        }
    }

    public onCancel(e): void {
        this.closeForm();
    }

    private closeForm(): void {
        this.active = false;
        this.cancel.emit();
    }
}
