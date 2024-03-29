import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { SharedModule } from '../../../app/shared/modules/shared.module';

@NgModule({
    declarations: [ChangePasswordComponent],
    imports: [CommonModule, ChangePasswordRoutingModule, SharedModule]
})
export class ChangePasswordModule {}
