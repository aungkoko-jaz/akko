import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotpasswordEmailComponent } from './forgotpassword-email.component';

const routes: Routes = [
  { path: '', component: ForgotpasswordEmailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotpasswordRoutingModule { }
