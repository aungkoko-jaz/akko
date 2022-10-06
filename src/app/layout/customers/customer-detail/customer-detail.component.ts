import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

import { CustomerService } from '../../../core/services/customer.service';
import { CustomerType } from '../../../core/models/customerType';
import { CustomerTypeService } from '../../../core/services/customer-type.service';
import { environment } from '../../../../environments/environment';

import { Globalfunction } from '../../../core/global/globalfunction';
import { FileInfo } from '@progress/kendo-angular-upload';

export class MyFileInfo implements FileInfo {
    name: string;
    uid?: string;
    myUid?: string;
}

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
    customerTypes: CustomerType[];
    selectedCustomerType: number;
    previewimage: {};
    tempdir: string = '-';
    uploadSaveUrl: string = '';
    uploadRemoveUrl: string = '';
    photoToRemove = null;

    public globalfunction: Globalfunction = new Globalfunction();

    customerEdit = this.fb.group({
        Id: [0],
        CustomerName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
        RegisterDate: [new Date()],
        CustomerAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        Inactive: [],
        CustomerTypeId: [0],
        CustomerPhoto: []
    });

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService,
        private customerTypeService: CustomerTypeService,
        private location: Location,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.uploadSaveUrl = `${environment.multi_file_api_url}` + '/Upload/TempDir';
        this.uploadRemoveUrl = `${environment.multi_file_api_url}` + '/Upload/TempRemoveDir';
        this.customerTypeService.getCustomerTypes().subscribe((cusType) => (this.customerTypes = cusType));
        this.getCustomer();
    }

    getCustomer(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.customerService.getMultiImagePath(id).subscribe((reimage) => {
            this.previewimage = reimage;
        });
        this.customerService.getCustomer(id).subscribe((recustomer) => {
            if (recustomer !== undefined) {
                recustomer.RegisterDate = new Date(new Date(recustomer.RegisterDate).toDateString());
                this.customerEdit.setValue(recustomer);
                this.selectedCustomerType = recustomer.CustomerTypeId;
            }
        });
    }

    goBack(): void {
        this.location.back();
    }

    saveCustomer(): void {
        var regDate = new Date(
            this.customerEdit.value.RegisterDate.getTime() -
                this.customerEdit.value.RegisterDate.getTimezoneOffset() * 60000
        );
        this.customerEdit.patchValue({ RegisterDate: regDate });
        if (this.customerEdit.value.CustomerPhoto != null) {
            this.customerEdit.patchValue({ CustomerPhoto: this.tempdir });
        }

        this.customerService.updateCustomer(this.customerEdit.getRawValue()).subscribe((recustomer) => {
            if (recustomer !== undefined) {
                this.router.navigate(['/customers']);
            }
        });
    }

    public uploadEventHandler(e) {
        e.data = { tempdir: this.tempdir, enFile: this.globalfunction.encryptData(e.files[0].name) };
    }

    public removeEventHandler(e) {
        const myFile: MyFileInfo = <MyFileInfo>e.files[0];
        e.data = { tempdir: this.tempdir, myUid: myFile.myUid };
    }

    public successEventHandler(e) {
        if (e.operation == 'upload') {
            this.tempdir = e.response.body.tempdir;
            let file = <MyFileInfo>e.files[0];
            file.myUid = e.response.body.myUid;
        }
    }

    public deleteImageHandler(e, filename) {
        this.photoToRemove = filename;
        e.preventDefault();
    }

    public confirmPhotoRemove(shouldRemove: boolean): void {
        if (shouldRemove) {
            this.customerService
                .deleteMultiCustomerPhoto(this.customerEdit.value.Id, this.photoToRemove.value.myUid)
                .subscribe((deletestatus) => {
                    delete this.previewimage[this.photoToRemove.key];
                    this.photoToRemove = null;
                });
        } else {
            this.photoToRemove = null;
        }
    }
}
