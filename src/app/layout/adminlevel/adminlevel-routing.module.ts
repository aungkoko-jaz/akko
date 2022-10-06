import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminlevelComponent } from './adminlevel.component';

const routes: Routes = [
  {path: '', component: AdminlevelComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminlevelRoutingModule { }
