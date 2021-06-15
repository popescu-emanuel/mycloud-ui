import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionType} from '../../_models/subscriptionType';

@Component({
    selector: 'app-subscription-type',
    templateUrl: './subscription-type.component.html',
    styleUrls: ['./subscription-type.component.scss']
})
export class SubscriptionTypeComponent implements OnInit {

    @Input()
    subscriptionType: SubscriptionType;

    constructor() {
    }

    ngOnInit(): void {
    }

}
