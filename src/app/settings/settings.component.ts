import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CloudService} from "../_services/cloud.service";
import {MustMatch} from "../_helpers/must-match";
import {ResetPasswordRequest} from "../_models/reset-password-request";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    colorScheme = {
        domain: ['#94e3c6', '#49cf9d', '#24c084', '#19b16f', '#d4ffe8']
    };

    dataStatistics = [
        {name: "Free space", value: 105000},
        {name: "Used space", value: 55000},
    ];

    folderFileRatio = [
        {name: "Folders", value: 105000},
        {name: "Files", value: 55000},
    ];

    checkoutForm: FormGroup;
    status = 'a';
    errorMessage = '';
    submitted: boolean;
    loading: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cloudService: CloudService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
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
                this.loading=false;
                console.log('Reset password status: ' + this.status);
            }, error => {
                this.errorMessage = 'Request could not be processed';
                this.status = '';
                console.log('Reset password error: ' + error);
                this.loading=false;
            });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.checkoutForm.controls;
    }

}
