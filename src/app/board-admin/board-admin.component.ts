import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {User} from '../_models/user';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-board-admin',
    templateUrl: './board-admin.component.html',
    styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.userService.getAll().pipe(first())
            .subscribe(users => {
                this.users = users;
            });
    }
}
