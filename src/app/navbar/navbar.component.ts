import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


    currentUser: User;

    constructor(
        private router: Router,
        public authService: AuthService,
        private userService: UserService,
        private authenticationService: AuthService
    ) {
        // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}
