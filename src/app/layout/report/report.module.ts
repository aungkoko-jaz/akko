import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';

import { ReportRoutingModule } from './report-routing.module';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';


@NgModule({
  declarations: [
    CustomerReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    GridModule,
    DropDownListModule,
    DatePickerModule,
    PageHeaderModule
  ]
})
export class ReportModule { }
