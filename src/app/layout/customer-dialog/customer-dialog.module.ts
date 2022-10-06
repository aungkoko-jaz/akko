import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { UploadModule, UploadsModule } from '@progress/kendo-angular-upload';
import { TranslateModule } from '@ngx-translate/core';

import { CustomerDialogRoutingModule } from './customer-dialog-routing.module';
import { CustomerListDialogComponent } from './customer-list-dialog/customer-list-dialog.component';
import { CustomerDetailDialogComponent } from './customer-detail-dialog/customer-detail-dialog.component';
import { CustomerInlineComponent } from './customer-inline/customer-inline.component';

@NgModule({
    declarations: [CustomerListDialogComponent, CustomerDetailDialogComponent, CustomerInlineComponent],
    imports: [
        CommonModule,
        CustomerDialogRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        DropDownListModule,
        GridModule,
        DatePickerModule,
        DialogModule,
        UploadModule,
        TranslateModule
    ]
})
export class CustomerDialogModule {}
