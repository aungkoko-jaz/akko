import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { LocalStorageService } from '../../../core/services/localstorage.service';
import { AdminService } from '../../../core/services/admin.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    public UserName: string;
    public UserLevelName: string;
    public profileImage: string;

    constructor(
        private translate: TranslateService,
        public router: Router,
        private localStorageService: LocalStorageService,
        private adminService: AdminService
    ) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
        this.UserName = this.localStorageService.getItem('UserName');
        this.UserLevelName = this.localStorageService.getItem('UserLevelName');
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.adminService.getProfileImage().subscribe((admImage) => {
            this.profileImage = admImage;
        });
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        this.localStorageService.clearAll();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
