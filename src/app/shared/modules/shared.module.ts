import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimePickerModule, DatePickerModule, DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule , DropDownListModule, MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { IntlModule } from '@progress/kendo-angular-intl';
import { PopupModule } from '@progress/kendo-angular-popup';
import { HttpClientModule } from '@angular/common/http';
import { PageHeaderModule } from './page-header/page-header.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TimePickerModule,
    DatePickerModule,
    DateInputsModule,
    DialogModule,
    InputsModule,
    ButtonsModule,
    GridModule,
    DropDownsModule,
    IntlModule,
    PopupModule,
    HttpClientModule,
    PageHeaderModule,
    MultiSelectModule,
    DropDownListModule,
    TranslateModule
  ],
  declarations: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    DialogModule,
    InputsModule,
    ButtonsModule,
    TimePickerModule,
    DatePickerModule,
    DateInputsModule,
    DropDownsModule,
    IntlModule,
    PopupModule,
    HttpClientModule,
    PageHeaderModule,
    MultiSelectModule,
    DropDownListModule,
    TranslateModule
  ]
})
export class SharedModule { }
