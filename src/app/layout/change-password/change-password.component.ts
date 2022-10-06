import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UnlockService } from '../../core/services/unlock.service';
import { LocalStorageService } from '../../core/services/localstorage.service';
import { CustomValidator } from '../../core/validators/custom.validator';
import { ModaldialogService } from '../../core/services/modaldialog.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    public minPasswordLength = `${environment.minPasswordLength}`;

    editForm: FormGroup = new FormGroup(
        {
            oldPassword: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
            Password: new FormControl('', {
                validators: Validators.compose([Validators.required, CustomValidator.validatePassword]),
                updateOn: 'blur'
            }),
            ConfirmPassword: new FormControl('', { validators: Validators.required, updateOn: 'blur' })
        },
        (formGroup: FormGroup) => {
            return CustomValidator.matchingConfirmPasswords(formGroup);
        }
    );

    constructor(
        private router: Router,
        private unlockService: UnlockService,
        private localStorageService: LocalStorageService,
        private modaldialogService: ModaldialogService
    ) {}

    ngOnInit(): void {}

    change() {
        this.unlockService
            .changePassword(this.editForm.value.oldPassword, this.editForm.value.Password)
            .subscribe((chpwd) => {
                if (chpwd.data == 1) {
                    this.modaldialogService.confirm('Change Password', 'Save Successfully', 'OK', '');
                    this.router.navigate(['/dashboard']);
                } else {
                    this.modaldialogService.confirm('Change Password', chpwd.error, 'OK', '');
                }
            });
    }

    cancel() {
        this.router.navigate(['/dashboard']);
    }
}
