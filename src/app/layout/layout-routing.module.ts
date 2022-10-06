import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

import { HeroesComponent } from './heroes/heroes/heroes.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { EmployeesComponent } from './employees/employees/employees.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';

import { NgxPermissionsModule } from 'ngx-permissions';
import { PermissionGuardService } from '../shared/guard/permission-guard.service';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            { path: 'heroes', component: HeroesComponent },
            { path: 'hero-detail/:id', component: HeroDetailComponent },
            { path: 'employees', component: EmployeesComponent },
            { path: 'employee-detail/:id', component: EmployeeDetailComponent },
            {
                path: 'customers',
                loadChildren: () => import('./customers/customer.module').then((m) => m.CustomerModule),
                canActivate: [PermissionGuardService]
            },
            {
                path: 'customer-dialog',
                loadChildren: () =>
                    import('./customer-dialog/customer-dialog.module').then((m) => m.CustomerDialogModule),
                canActivate: [PermissionGuardService]
            },
            {
                path: 'reports',
                loadChildren: () => import('./report/report.module').then((m) => m.ReportModule),
                canActivate: [PermissionGuardService]
            },
            {
                path: 'admins',
                loadChildren: () => import('./admins/admins.module').then((m) => m.AdminsModule),
                canActivate: [PermissionGuardService]
            },
            {
                path: 'adminlevel',
                loadChildren: () => import('./adminlevel/adminlevel.module').then((m) => m.AdminlevelModule),
                canActivate: [PermissionGuardService]
            },
            {
                path: 'change-password',
                loadChildren: () =>
                    import('./change-password/change-password.module').then((m) => m.ChangePasswordModule)
            },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then((m) => m.ChartsModule) },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then((m) => m.TablesModule) },
            { path: 'forms', loadChildren: () => import('./form/form.module').then((m) => m.FormModule) },
            {
                path: 'bs-element',
                loadChildren: () => import('./bs-element/bs-element.module').then((m) => m.BsElementModule)
            },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then((m) => m.GridModule) },
            {
                path: 'components',
                loadChildren: () => import('./bs-component/bs-component.module').then((m) => m.BsComponentModule)
            },
            {
                path: 'blank-page',
                loadChildren: () => import('./blank-page/blank-page.module').then((m) => m.BlankPageModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), NgxPermissionsModule.forChild()],
    exports: [RouterModule],
    providers: [PermissionGuardService]
})
export class LayoutRoutingModule {}
