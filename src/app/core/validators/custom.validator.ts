import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../../core/services/localstorage.service';

export class CustomValidator {    
    static validatePassword(fc: FormControl) {
        var localStorageService: LocalStorageService = new LocalStorageService();
        const minPasswordLength = `${environment.minPasswordLength}`;
        // tslint:disable-next-line:radix
        const minpswlength = parseInt(minPasswordLength) - 1;
        const pattern = new RegExp('^([A-Z].*)(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{' + minpswlength + ',}$');
        if (!pattern.test(fc.value)) {
            return {validatePassword: false};
        } else {
            return null;
        }
    }
    
    static matchingConfirmPasswords(passwordKey: any) { 
        const passwordInput = passwordKey['value']; 
        if (passwordInput.Password === passwordInput.ConfirmPassword) { 
            return null; 
        } else { 
            return passwordKey.controls['ConfirmPassword'].setErrors({ passwordNotEquivalent: true }); 
        } 
    }
}
