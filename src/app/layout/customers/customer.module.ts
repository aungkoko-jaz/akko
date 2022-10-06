import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { UploadModule } from '@progress/kendo-angular-upload';
import { DialogModule } from '@progress/kendo-angular-dialog';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerAddComponent } from './customer-add/customer-add.component';

import { PermissionGuardService } from '../../../app/shared/guard/permission-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from '../../core/interceptors/http.token.interceptor';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../core/services/localstorage.service';

import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
    declarations: [CustomerListComponent, CustomerDetailComponent, CustomerAddComponent],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        DropDownListModule,
        GridModule,
        DatePickerModule,
        DropDownListModule,
        UploadModule,
        DialogModule,
        NgxPermissionsModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpTokenInterceptor,
            multi: true,
            deps: [Router, LocalStorageService]
        },
        PermissionGuardService
    ]
})
export class CustomerModule {}
