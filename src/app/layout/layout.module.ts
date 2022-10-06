import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import { HeroesComponent } from './heroes/heroes/heroes.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { HeroSearchComponent } from './heroes/hero-search/hero-search.component';

import { EmployeesComponent } from './employees/employees/employees.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { EmployeeSearchComponent } from './employees/employee-search/employee-search.component';

import { MessagesComponent } from './messages/messages.component';

@NgModule({
    imports: [CommonModule, LayoutRoutingModule, TranslateModule, NgbDropdownModule, FormsModule],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent,
        HeroesComponent,
        HeroDetailComponent,
        HeroSearchComponent,
        EmployeesComponent,
        EmployeeDetailComponent,
        EmployeeSearchComponent,
        MessagesComponent
    ]
})
export class LayoutModule {}
