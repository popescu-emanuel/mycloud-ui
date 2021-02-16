import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './_models/user';
import {AuthService} from './_services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title: 'App component';
    currentUser: User;

    constructor(
        private router: Router,
        public authService: AuthService
    ) {
        // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

}
