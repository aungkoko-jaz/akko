import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import * as path from 'path';

const routes: Routes = [{ path: 'customer', component: CustomerReportComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule {}
