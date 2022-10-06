import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';

import { Admin } from '../../../core/models/admin';
import { AdminService } from '../../../core/services/admin.service';
import { LocalStorageService } from '../../../core/services/localstorage.service';
import { DataTransferService } from '../../../core/services/data-transfer-service';

import { ModaldialogService } from '../../../core/services/modaldialog.service';
import { UnlockService } from '../../../core/services/unlock.service';

@Component({
    selector: 'app-admin-list',
    templateUrl: './admin-list.component.html',
    styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
    public admingrid: GridDataResult;
    public adminToRemove: any;
    public adminLevelComboData: any;
    public adminLevelComboSource: any;
    public editDataItem: any;

    public gridState: DataSourceRequestState = {
        skip: 0,
        take: 10,
        filter: { logic: 'and', filters: [] }
    };

    constructor(
        private router: Router,
        private adminService: AdminService,
        private localStorageService: LocalStorageService,
        private dataTransferService: DataTransferService,
        private modaldialogService: ModaldialogService,
        private unLockService: UnlockService,
    ) {}

    ngOnInit(): void {
        const currentState = localStorage.getItem('ListAdminState');
        if (currentState != null) {
            this.gridState = JSON.parse(currentState);
        } else {
            localStorage.setItem('ListAdminState', JSON.stringify(this.gridState));
        }

        this.adminService.getAdminConboData().subscribe((admCombo) => {
            this.adminLevelComboData = admCombo.adminLevel;
            this.adminLevelComboSource = admCombo.adminLevel;
        });
        this.getAdmins();
    }

    getAdmins(): void {
        this.adminService.getAdminListGrid(this.gridState).subscribe((readmin) => {
            this.admingrid = readmin;
        });
    }

    removeHandler({ dataItem }) {
        this.adminToRemove = dataItem;
    }

    confirmRemove(shouldRemove: boolean): void {
        if (shouldRemove) {
            this.adminService.deleteAdmin(this.adminToRemove.AdminID).subscribe((deleteStatus) => {
                this.getAdmins();
            });
        }
        this.adminToRemove = null;
    }

    // detail(admin: Admin): void {
    //     this.router.navigate([`/admins/detail/${admin.AdminID}`]);
    // }

    editHandler(dataItem) {
        this.editDataItem = dataItem;
        this.dataTransferService.TransgerEditData(this.editDataItem);
        this.dataTransferService.TransferExtraData(this.adminLevelComboData);
        this.router.navigate(['admins/editAdmin']);
    }

    onStateChange(dstate: DataStateChangeEvent): void {
        this.gridState = dstate;
        localStorage.setItem('ListAdminState', JSON.stringify(this.gridState));
        this.getAdmins();
    }

    handleFilter(value) {
        this.adminLevelComboData = this.adminLevelComboSource.filter(
            (s) => s.AdminLevelName.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
    }

    public onChange(ID: any): void {
        const levelindex = this.gridState.filter.filters.findIndex((s) => s['field'] == 'AdminLevelID');
        if (ID != null) {
            const searchAdminLevel = { field: 'AdminLevelID', operator: 'eq', value: ID };
            if (levelindex < 0) {
                this.gridState.filter.filters.push(searchAdminLevel);
            } else {
                const position = this.gridState.filter.filters[levelindex];
                position['value'] = ID;
            }
        } else {
            if (levelindex >= 0) {
                this.gridState.filter.filters.splice(levelindex, 1);
            }
        }
        this.localStorageService.setItemObj('ListAdminState', this.gridState);
        this.getAdmins();
    }

    unBlock(dataItem) {
        const adminID = dataItem.AdminID;
        this.adminService.unBlock(adminID)
          .subscribe(x => {
            if (x.data == true) {
              this.getAdmins();
              this.modaldialogService.confirm('Admin', 'Unblock Successfully!', 'Ok', '');
            } else {
              this.modaldialogService.confirm('Admin', 'Unblock Unsuccessfully!', 'Ok', '');
            }
          });
      }
    
      
      InactivateAdmin(dataItem) {
        const adminID = dataItem.AdminID;
        this.adminService.InactivateAdmin(adminID)
          .subscribe(x => {
            if (x.data == true) {
              this.modaldialogService.confirm('Admin', 'Inactivate Admin Successfully!', 'Ok', '');
              this.getAdmins();
            } else {
              this.modaldialogService.confirm('Admin', 'Inactivate Admin Fail!', 'Ok', '');
            }
          });
      }
      ActivateAdmin(dataItem) {
        const adminID = dataItem.AdminID;
        this.adminService.ActivateAdmin(adminID)
          .subscribe(x => {
            if (x.data == true) {
              this.modaldialogService.confirm('Admin', 'Activate Admin Successfully!', 'Ok', '');
              this.getAdmins();
            } else {
              this.modaldialogService.confirm('Admin', 'Activate Admin Unsuccessfully!', 'Ok', '');
            }
          });
      }
    
      resetPassword(dataItem) {
        this.modaldialogService.confirm('Please confirm...', 'Are you sure you want to reset Password for this Admin' + '?', 'Yes', 'No')
          .then((confirmed) => {
            if (confirmed) {
              const adminID = dataItem.AdminID;
              this.unLockService.resetPassword(adminID)
                .subscribe(x => {
                  if (x.data) {
                    this.modaldialogService.confirm('Admin', `New Password is ${x.data}`, 'OK', '');
                  } else {
                    this.modaldialogService.confirm('Admin', 'Reset Password Unsuccessfully', 'Ok', '');
                  }
                });
            }
          })
          .catch(() => { });
    
      }
}
