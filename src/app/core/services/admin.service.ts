import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { Observable, of } from 'rxjs';

import { Admin } from '../models/admin';
import { ApiService } from './api.service';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    constructor(private apiService: ApiService, private messageService: MessageService) {}

    getAdmins(): Observable<Admin[]> {
        return this.apiService.get(`/Admin`);
    }

    // Get admin list with grid state
    getAdminListGrid(gridState: DataSourceRequestState): Observable<GridDataResult> {
        return this.apiService.fetchgridpostJson(`/Admin/GetAdminList`, gridState);
    }

    // Get all admin level
    getAdminConboData(): Observable<any> {
        return this.apiService.get('/Admin/GetAdminComboData');
    }

    // Get admin details
    getAdminDetail(id: number): Observable<Admin> {
        return this.apiService.get(`/Admin/${id}`);
    }

    // Add new admin
    addAdmin(admin: Admin): Observable<Admin[]> {
        return this.apiService.postJson(`/Admin`, admin);
    }

    // Add new admin setup
    addAdminSetup(admin: Admin): Observable<Admin[]> {
        return this.apiService.postJson(`/Admin/AddAdminSetup/`, admin);
    }

    // Update admin
    updateAdminSetup(admin: any): Observable<any> {
        return this.apiService.postJson(`/Admin/UpdateAdminSetup`, admin);
    }

    // Delete admin
    deleteAdmin(id: number): Observable<Admin[]> {
        return this.apiService.delete(`/Admin/DeleteAdmin/${id}`);
    }

    // Delete admin photo
    deleteAdminPhoto(id: number, filename: string): Observable<string> {
        var encryptdata = btoa(id.toString());
        return this.apiService.postJson('/fileservice/Remove/AdminPhoto/' + encryptdata, filename);
    }

    // Get admin image
    getImagePath(id: number): Observable<string> {
        var encryptdata = btoa(id.toString());
        return this.apiService.get('/fileservice/Download/AdminPhoto/' + encryptdata);
    }

    // Get admin photo without id using backend token
    getProfileImage(): Observable<string> {
        return this.apiService.get('/FileService/ProfilePhoto');
    }

    unBlock(adminID: number) {
        return this.apiService.get('/Admin/unBlock/' + adminID.toString());
    }

    InactivateAdmin(adminID: number) {
        return this.apiService.get('/Admin/InactivateAdmin/' + adminID.toString());
    }
    ActivateAdmin(adminID: number) {
        return this.apiService.get('/Admin/ActivateAdmin/' + adminID.toString());
    }

    // ====> Error Handling  <=====
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    private log(message: string) {
        this.messageService.add(`Admin Level: ${message}`);
    }
}
