import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {User} from '../_models/user';
import {AuthService} from '../_services/auth.service';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    currentUser: User;
    userFromApi: User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {

    }
}
