import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminlevelRoutingModule } from './adminlevel-routing.module';
import { AdminlevelComponent } from './adminlevel.component';
import { FilteradminlevelPipe } from './filteradminlevel.pipe';
import { TreeviewModule } from 'ngx-treeview';
import { SharedModule } from '../../../app/shared/modules/shared.module';

@NgModule({
  imports: [
  	CommonModule,
    AdminlevelRoutingModule,
    TreeviewModule.forRoot(),  //forRoot is necessary, otherwise got error TreeviewI18n
    SharedModule
  ],
  declarations: [AdminlevelComponent, FilteradminlevelPipe]
})
export class AdminlevelModule { }
