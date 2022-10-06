import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModaldialogService } from '../core/services/modaldialog.service';
import { UnlockService } from '../core/services/unlock.service';
import { CustomValidator } from '../core/validators/custom.validator';

@Component({
  selector: 'app-forgotpassword-email',
  templateUrl: './forgotpassword-email.component.html',
  styleUrls: ['./forgotpassword-email.component.scss']
})
export class ForgotpasswordEmailComponent implements OnInit {
  IsOTPSent: boolean = false;
  IsOTPTimeout: boolean = false;
  OTPTimeoutCountDown: number = 0;
  OTPTimeoutInterval;
  OTPPrefix: string = "";
  fgpform = this.fb.group({
    LoginName: ['', [Validators.required]],
    Email: ['', [ Validators.required, Validators.email]]
  });

  constructor(
    private unlockService: UnlockService,
    private modaldialogService: ModaldialogService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  createFormGroup() {
    this.fgpform = this.fb.group({
      LoginName: [this.fgpform.value.LoginName, [ Validators.required ]],
      Email: [this.fgpform.value.Email, [ Validators.required, Validators.email ]],
      OTPPrefix: [this.OTPPrefix, [Validators.required]],
      OTPPasscode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      Password: ['', [Validators.compose([
                    Validators.required,
                    CustomValidator.validatePassword
                  ])]],
      ConfirmPassword: ['', [ Validators.required ]]
    }, 
    { validator: CustomValidator.matchingConfirmPasswords }
    );
  }

  requestOTP() {
    console.log("requestOTP");
    this.IsOTPTimeout = false;
    this.unlockService.forgetPasswordGetOTP(this.fgpform.value)
        .subscribe(x => {
          if(x.data == 1) {
            this.IsOTPSent = true;
            this.OTPPrefix = x.prefix_char;
            this.createFormGroup();
            
            setTimeout(()=>{   //after 10 second, allow to resend new OTP
                  this.IsOTPTimeout = true;
            }, 10000);
            this.startOTPCountdown();
          }
          else {
            this.modaldialogService.messageDialogOkBox(x.error, 'Forget Password');
            this.IsOTPTimeout = true;
          }
          console.log(x);
        });
  }

  startOTPCountdown() {
    this.OTPTimeoutCountDown = 10;
    this.OTPTimeoutInterval = setInterval(() => {
      this.OTPTimeoutCountDown = this.OTPTimeoutCountDown - 1;
      if(this.OTPTimeoutCountDown <= 0)
        clearInterval(this.OTPTimeoutInterval);
    }, 1000);
  }

  changePassword() {
    console.log("chagnePwd");
    this.unlockService.changePasswordByOTP(this.fgpform.value)
        .subscribe(x => {
          if(x.data == 1) {
            this.modaldialogService.messageDialogOkBox(x.Message, 'Forget Password');
            this.router.navigate(['/login']);
          }
          else {
            this.modaldialogService.messageDialogOkBox(x.error, 'Forget Password');
          }
          console.log(x);
        });
  }
}
