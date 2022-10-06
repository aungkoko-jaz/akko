import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotpasswordRoutingModule } from './forgotpassword-routing.module';
import { ForgotpasswordEmailComponent } from './forgotpassword-email.component';
import { SharedModule } from '../shared/modules/shared.module';


@NgModule({
  declarations: [ForgotpasswordEmailComponent],
  imports: [
    CommonModule,
    ForgotpasswordRoutingModule,
    SharedModule
  ]
})
export class ForgotpasswordModule { }
