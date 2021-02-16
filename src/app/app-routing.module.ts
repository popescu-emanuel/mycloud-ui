import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './_services/auth-guard.service';
import {RoleEnum} from './_models/roleEnum';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {RegisterComponent} from './register/register.component';
import {ContactComponent} from './contact/contact.component';
import {FilesComponent} from './files/files.component';
import {SettingsComponent} from "./settings/settings.component";
import {TokenexpiredComponent} from "./tokenexpired/tokenexpired.component";


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'admin',
        component: BoardAdminComponent,
        canActivate: [AuthGuardService],
        data: {
            roles: [RoleEnum.Admin]
        }
    },
    {
        path: 'files',
        component: FilesComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: 'tokenexpired',
        component: TokenexpiredComponent,
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
