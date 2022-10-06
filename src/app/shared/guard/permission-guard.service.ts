import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable } from 'rxjs';
import { Globalfunction } from '../../core/global/globalfunction';
import { LocalStorageService } from '../../core/services/localstorage.service';


@Injectable({
  providedIn: 'root'
})

export class PermissionGuardService implements CanActivate {
  public globalfunction: Globalfunction = new Globalfunction();
  
  constructor(private router: Router, private permissionService: NgxPermissionsService,
              private localstorageService: LocalStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
    const menulist = JSON.parse(this.localstorageService.getItem('menuList'));
    if(menulist == null) {  //go to login page when logout at other browser Tab
      this.router.navigate(['/login']);
      return false;
    }

    const routObj = this.globalfunction.FilterJsonRegExp(menulist, 'ControllerName', state.url.substring(1));  //couldn't set different set of child permission under the same module should be 
    
    if (routObj.length > 0 && routObj[0].Permission != null) {
      this.permissionService.loadPermissions(routObj[0].Permission.split(','));
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
