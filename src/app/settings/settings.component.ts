import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CloudService} from '../_services/cloud.service';
import {MustMatch} from '../_helpers/must-match';
import {ResetPasswordRequest} from '../_models/reset-password-request';
import {UserService} from '../_services/user.service';
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/user';
import {SubscriptionType} from '../_models/subscriptionType';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    colorScheme = {
        domain: ['#94e3c6', '#49cf9d', '#24c084', '#19b16f', '#d4ffe8']
    };

    dataStatistics;

    folderFileRatio = [
        {name: 'Folders', value: 105000},
        {name: 'Files', value: 55000},
    ];

    subscriptionTypes = [
        new SubscriptionType('BASIC', 5,5),
        new SubscriptionType('PREMIUM',  10,10)
    ];

    checkoutForm: FormGroup;
    status = 'a';
    errorMessage = '';
    submitted: boolean;
    loading: boolean;
    private currentUser: User;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cloudService: CloudService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private authenticationService: AuthService) {
        // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit(): void {
        this.getStats();
        this.checkoutForm = this.formBuilder.group({
            oldPassword: [
                undefined,
                Validators.required
            ],
            password: [
                undefined,
                [
                    Validators.required,
                    Validators.minLength(2)
                ]
            ],
            passwordConfirm: [
                undefined,
                [
                    Validators.required,
                    Validators.minLength(2)
                ],
            ]
        }, {validators: MustMatch('password', 'passwordConfirm')});
    }

    resetPassword() {

        this.submitted = true;

        // stop here if form is invalid
        if (this.checkoutForm.invalid) {
            return;
        }

        this.loading = true;

        let rpr = new ResetPasswordRequest();
        rpr.oldPassword = this.f.oldPassword.value;
        rpr.newPassword = this.f.password.value;

        this.cloudService.resetPassword(rpr).subscribe(
            data => {
                this.status = 'Password changed';
                this.errorMessage = '';
                this.loading = false;
                console.log('Reset password status: ' + this.status);
            }, error => {
                this.errorMessage = 'Request could not be processed';
                this.status = '';
                console.log('Reset password error: ' + error);
                this.loading = false;
            });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.checkoutForm.controls;
    }

    getStats() {
        this.cloudService.getMemoryAllocation()
            .subscribe(
                data => {
                    console.log('Statistics retrieved ' + data.totalSize + ', ' + data.usedSpace);

                    let totalSize = Number(this.getMultiplier(data.totalSize));
                    let usedSpace = Number(this.getMultiplier(data.usedSpace));
                    let freeSpace = Number(totalSize - usedSpace);

                    this.dataStatistics = [
                        {name: 'Free space', value: freeSpace},
                        {name: 'Used space', value: usedSpace}
                    ];
                },
                error => {
                    console.log('Statistics could not be retrieved');
                });
    }

    getMultiplier(memory) {
        const split = memory.split(' ');
        const value = split[0];
        const type = split[1];
        let returnValue;
        console.log('Type for ' + memory + ' is ' + type);
        switch (type) {
            case 'GB':
                returnValue = value * 1000;
                console.log('Value in mb: ' + returnValue);
                return returnValue;
            case 'MB':
                returnValue = value;
                console.log('Value in mb: ' + returnValue);
                return returnValue;
            default:
                return value;
        }
    }


}
