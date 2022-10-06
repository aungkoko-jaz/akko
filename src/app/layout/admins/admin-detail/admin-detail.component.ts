import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

import { AdminService } from '../../../core/services/admin.service';
import { AdminlevelService } from '../../../core/services/adminlevel.service';
import { AdminLevel } from '../../../core/models/adminLevel';
import { environment } from '../../../../environments/environment';

import { Globalfunction } from '../../../core/global/globalfunction';
import { DataTransferService } from '../../../core/services/data-transfer-service';

@Component({
    selector: 'app-admin-detail',
    templateUrl: './admin-detail.component.html',
    styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent implements OnInit {
    adminLevels: AdminLevel[];
    adminData: any;
    previewimage: string;
    tempimage: string = '';
    photoToRemove: string;

    uploadSaveUrl: string = '';
    uploadRemoveUrl: string = '';
    public globalfunction: Globalfunction = new Globalfunction();

    editAdmin = this.fb.group({
        AdminID: [0],
        AdminLevelID: [0],
        AdminName: ['', [Validators.minLength(5), Validators.maxLength(50)]],
        LoginName: ['', [Validators.minLength(5), Validators.maxLength(25)]],
        Email: ['', [Validators.required]],
        AdminPhoto: ['']
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private adminService: AdminService,
        private adminLevelService: AdminlevelService,
        private dataTransferService: DataTransferService
    ) {}

    ngOnInit(): void {
        this.uploadSaveUrl = `${environment.file_api_url}` + '/Upload/Temp';
        this.uploadRemoveUrl = `${environment.file_api_url}` + '/Upload/TempRemove';
        // this.adminService.getAdminConboData().subscribe((admlStatus) => (this.adminLevels = admlStatus));
        // this.getAdmins();

        // ====>    use data transfer service   <====
        this.dataTransferService.currentEditData.subscribe((eData) => (this.adminData = eData));
        this.dataTransferService.currentExtraData.subscribe((xData) => (this.adminLevels = xData));
        this.editAdminData();
    }

    // getAdmins(): void {
    //     const AdminID = Number(this.route.snapshot.paramMap.get('id'));
    //     this.adminService.getImagePath(AdminID).subscribe((admImg) => {
    //         this.previewimage = admImg;
    //     });

    //     this.adminService.getAdminDetail(AdminID).subscribe((admStatus) => {
    //         this.editAdmin.patchValue({
    //             AdminID: admStatus.AdminID,
    //             AdminLevelID: admStatus.AdminLevelID,
    //             AdminName: admStatus.AdminName,
    //             LoginName: admStatus.LoginName,
    //             Email: admStatus.Email,
    //             AdminPhoto: admStatus.AdminPhoto
    //         });
    //     });
    // }

    editAdminData(): void {
        if (this.adminData.AdminID != null) {
            const id = Number(this.adminData.AdminID);
            this.adminService.getImagePath(id).subscribe((admImg) => {
                this.previewimage = admImg;
            });
            this.editAdmin.patchValue({
                AdminID: this.adminData.AdminID,
                AdminLevelID: this.adminData.AdminLevelID,
                AdminName: this.adminData.AdminName,
                LoginName: this.adminData.LoginName,
                Email: this.adminData.Email,
                AdminPhoto: this.adminData.AdminPhoto
            });
        }
    }

    saveAdmin(): void {
        if (this.editAdmin.value.AdminPhoto != null) {
            this.editAdmin.patchValue({ AdminPhoto: this.tempimage });
        }
        this.adminService.updateAdminSetup(this.editAdmin.getRawValue()).subscribe((updateStatus) => {
            this.router.navigate(['/admins']);
        });
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

    public deleteImageHandler(e) {
        this.photoToRemove = 'AdminPhoto';
        e.priventDefault();
    }

    public confirmPhotoRemove(shouldRemove: boolean): void {
        if (shouldRemove) {
            this.adminService
                .deleteAdminPhoto(this.editAdmin.value.AdminID, this.photoToRemove)
                .subscribe((deleteStatus) => {
                    delete this.previewimage[this.photoToRemove];
                    this.photoToRemove = null;
                    this.previewimage = null;
                });
        } else {
            this.photoToRemove = null;
        }
    }

    goBack(): void {
        this.location.back();
    }
}
