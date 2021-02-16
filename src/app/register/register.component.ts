import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    form: any = {};
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';
    loading: boolean;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.loading = true;
        this.authService.register(this.form).subscribe(
            data => {
                console.log(data);
                this.isSuccessful = true;
                this.isSignUpFailed = false;
                this.loading = false;
            },
            err => {
                console.log(err);
                this.errorMessage = err;
                this.isSignUpFailed = true;
                this.loading = false;
            }
        );
    }
}
