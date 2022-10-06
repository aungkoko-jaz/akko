import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { PermissionGuardService } from '../../../app/shared/guard/permission-guard.service';
import * as path from 'path';

const routes: Routes = [
    { path: '', component: CustomerListComponent, canActivate: [PermissionGuardService] },
    { path: 'detail/:id', component: CustomerDetailComponent, canActivate: [PermissionGuardService] },
    { path: 'add', component: CustomerAddComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule {}
