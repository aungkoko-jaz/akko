import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';

const routes: Routes = [
    { path: '', component: AdminListComponent },
    { path: 'add', component: AdminAddComponent },
    { path: 'detail/:id', component: AdminDetailComponent },
    { path: 'editAdmin', component: AdminDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminsRoutingModule {}
