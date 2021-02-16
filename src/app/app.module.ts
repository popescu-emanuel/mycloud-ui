import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {AuthInterceptor, authInterceptorProviders} from './_helpers/auth.interceptor';
import {UploadFilesComponent} from './uploadfiles/upload-files.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ErrorInterceptor} from './_helpers/error-interceptor';
import { FilesComponent } from './files/files.component';
import { FooterComponent } from './footer/footer.component';
import { NewFolderContainerComponent } from './modals/new-folder-container/new-folder-container.component';
import { NewFolderContentModal } from './modals/new-folder-content/new-folder-content-modal.component';
import { SettingsComponent } from './settings/settings.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TokenexpiredComponent } from './tokenexpired/tokenexpired.component';
import {NgxGaugeModule} from "ngx-gauge";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxChartsModule} from "@swimlane/ngx-charts";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        ProfileComponent,
        BoardAdminComponent,
        UploadFilesComponent,
        FilesComponent,
        FooterComponent,
        NewFolderContainerComponent,
        NewFolderContentModal,
        SettingsComponent,
        NavbarComponent,
        TokenexpiredComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        NgxGaugeModule,
        BrowserAnimationsModule,
        NgxChartsModule
    ],
    providers: [
        authInterceptorProviders,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
    entryComponents: [ NewFolderContentModal ]
})
export class AppModule {
}
