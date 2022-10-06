import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

import { Admin } from '../../../core/models/admin';
import { AdminService } from '../../../core/services/admin.service';
import { AdminLevel } from '../../../core/models/adminLevel';
import { AdminlevelService } from '../../../core/services/adminlevel.service';
import { environment } from '../../../../environments/environment';

import { Globalfunction } from '../../../core/global/globalfunction';

@Component({
    selector: 'app-admin-add',
    templateUrl: './admin-add.component.html',
    styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {
    adminLevels: [];
    uploadSaveUrl: string = '';
    uploadRemoveUrl: string = '';
    tempimage: string = '';
    public globalfunction: Globalfunction = new Globalfunction();

    newAdmin = this.fb.group({
        AdminID: [0],
        AdminLevelID: [0],
        AdminName: ['', [Validators.minLength(5), Validators.maxLength(50)]],
        LoginName: ['', [Validators.minLength(5), Validators.maxLength(25)]],
        Email: ['', [Validators.required]],
        Password: ['', [Validators.minLength(8)]],
        ConfirmPassword: ['', [Validators.minLength(8)]],
        AdminPhoto: ['']
    });

    constructor(
        private router: Router,
        private location: Location,
        private fb: FormBuilder,
        private adminService: AdminService,
        private adminLevelService: AdminlevelService
    ) {}

    ngOnInit(): void {
        this.uploadSaveUrl = `${environment.file_api_url}` + '/Upload/Temp';
        this.uploadRemoveUrl = `${environment.file_api_url}` + '/Upload/TempRemove';
        this.adminService.getAdminConboData().subscribe((adml) => {
            this.adminLevels = adml.adminLevel;
        });
    }

    addNewAdmin(): void {
        if (this.newAdmin.value.Password !== this.newAdmin.value.ConfirmPassword) {
            alert("Password doesn't match.");
        } else {
            if (this.newAdmin.value.AdminPhoto != null) {
                this.newAdmin.patchValue({ AdminPhoto: this.tempimage });
            }

            this.newAdmin.removeControl('ConfirmPassword');
            this.adminService.addAdminSetup(this.newAdmin.getRawValue()).subscribe((admStatus) => {
                this.router.navigate(['/admins']);
            });
        }
    }

    public successEventHandler(e) {
        if (e.operation == 'upload') {
            this.tempimage = e.response.body;
        }
    }

    public removeEventHandler(e) {
        e.files[0].name = this.tempimage;
    }

    public uploadEventHandler(e) {
        e.data = {
            enFile: this.globalfunction.encryptData(e.files[0].name)
        };
    }

    goBack(): void {
        this.location.back();
    }
}
