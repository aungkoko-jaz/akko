import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminlevelService {
  constructor(private apiService: ApiService) { }
  getAdminLevel(ID) {
    return this.apiService.get('/Adminlevel/GetAdminLevel/' + ID);
  }  

  getAdminLevelMenu(ID) {
    return this.apiService.get('/Adminlevel/GetAdminLevelMenu/' + ID);
  }  

  saveAdminLevel(adminLevelSet) {
    return this.apiService.postJson('/Adminlevel/SaveAdminLevel', adminLevelSet);
  }

  saveAdminLevelMenu(adminLevelID, adminMenuList) {
    return this.apiService.postJson('/Adminlevel/SaveAdminLevelMenu/' + adminLevelID, {adminMenuList: adminMenuList});
  }

  deleteAdminLevel(adminLevelID) {
    return this.apiService.delete('/Adminlevel/DeleteAdminLevel/' + adminLevelID);
  }
}
