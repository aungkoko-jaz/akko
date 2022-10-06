import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UnlockService {

  constructor(private apiservice: ApiService) { }

  // checkOldPassword(oldPassword) {
  //   return this.apiservice.postJson('/admin/checkPassword', {oldPassword: oldPassword});
  // }

  changePassword(oldPassword, newPassword) {
    return this.apiservice.postJson('/Admin/PassChange', {oldPassword: oldPassword, newPassword: newPassword});

  }

  resetPassword(adminID) {
    return this.apiservice.get('/admin/ResetPassword/' + adminID);
  }

  forgetPasswordGetOTP(emailrequest) {
    return this.apiservice.postJson('/ForgotPassword/RequestByEmail', emailrequest);
  }

  changePasswordByOTP(emailrequest) {
    return this.apiservice.postJson('/ForgotPassword/ChangePasswordByOTP', emailrequest);
  }

}
