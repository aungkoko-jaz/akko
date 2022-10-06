import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { LocalStorageService } from './localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // public userlevelID;

    constructor(private apiService: ApiService, private localstorageService: LocalStorageService) {}

    purgeAuth() {
        // Remove JWT from localstorage
        this.localstorageService.clearAll();
    }

    attemptAuth(credentials): Observable<any> {
        const body = {
            LoginType: '1',
            username: credentials.Username,
            password: credentials.Password,
            grant_type: 'password'
        };
        return this.apiService.postJson('/token', body).pipe(
            map((data) => {
                if (data != undefined) {
                    this.localstorageService.setItemString('authorizationData', data.AccessToken); // save access token
                    this.localstorageService.setItemString('UserName', data.DisplayName);
                    this.localstorageService.setItemObj('UserID', data.UserID);
                    this.localstorageService.setItemString('UserLevelName', data.UserLevelName);
                    this.localstorageService.setItemObj('LoginType', data.LoginType);
                    this.localstorageService.setItemObj('LoginUserImage', data.userImage);
                }
                return <any>data;
            })
        );
    }

    getUserMenu(): Observable<any> {
        //this.userlevelID=userLevelID;
        return this.apiService.get('/menu/GetAdminLevelMenuData').pipe(
            map((response) => {
                //console.log(response.data);
                this.localstorageService.setItemObj('menuList', response.data);
                this.localstorageService.setItemString('isLoggedin', 'true');
            })
        );
    }
}
