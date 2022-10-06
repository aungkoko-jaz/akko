import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { UserService } from '../core/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginData = new FormGroup({
        Username: new FormControl('', [Validators.required, Validators.minLength(5)]),
        Password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    loginError: string;
    loginFail = false;

    constructor(public router: Router, private userService: UserService) {}

    ngOnInit() {}

    onLoggedin() {
        //localStorage.setItem('isLoggedin', 'true');
        //this.router.navigateByUrl('/');
        this.userService.attemptAuth(this.loginData.value).subscribe({
            next: (data) => {
                if (data.error) {
                    this.loginFail = true;
                    this.router.navigate(['/login']);
                    this.loginError = data.error.message;
                } else {
                    localStorage.setItem('isLoggedin', 'true');
                    this.userService.getUserMenu().subscribe((res) => this.router.navigateByUrl('/'));
                }
            },
            error: (err) => {
                console.log('Login fail..');
                console.log(err.message);
                this.loginFail = true;
                this.router.navigate(['/login']);
                this.loginError = err;
            }
        });
    }
}
