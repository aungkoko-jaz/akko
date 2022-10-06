import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListDialogComponent } from './customer-list-dialog/customer-list-dialog.component';
import { CustomerDetailDialogComponent } from './customer-detail-dialog/customer-detail-dialog.component';
import { CustomerInlineComponent } from './customer-inline/customer-inline.component';

const routes: Routes = [
    { path: '', component: CustomerListDialogComponent },
    {path:'inline', component: CustomerInlineComponent},
    { path: 'detail/:id', component: CustomerDetailDialogComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerDialogRoutingModule {}
