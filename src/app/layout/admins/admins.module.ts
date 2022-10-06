import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { UploadModule } from '@progress/kendo-angular-upload';

import { AdminsRoutingModule } from './admins-routing.module';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';

@NgModule({
  declarations: [
    AdminListComponent,
    AdminAddComponent,
    AdminDetailComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GridModule,
    ButtonModule,
    DialogModule,
    DropDownListModule,
    UploadModule,
    PageHeaderModule
  ]
})
export class AdminsModule { }
