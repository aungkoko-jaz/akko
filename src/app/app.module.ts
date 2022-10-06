import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { HttpTokenInterceptor } from './core/interceptors/http.token.interceptor';

import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from './shared/modules/shared.module';
import { AuthGuard } from './shared';
import { LocalStorageService } from './core/services/localstorage.service';
import { ModaldialogService } from './core/services/modaldialog.service';

import { DialogComponent } from './dialog/dialog.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        ButtonsModule,
        DateInputsModule,
        GridModule,
        DialogsModule,
        UploadsModule,
        SharedModule,
        NgxPermissionsModule.forRoot()
    ],
    declarations: [AppComponent, DialogComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpTokenInterceptor,
            multi: true,
            deps: [Router, LocalStorageService, ModaldialogService]
        },
        AuthGuard,
        ModaldialogService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
