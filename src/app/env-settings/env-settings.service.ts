import { Injectable } from '@angular/core';
import {EnvSettings} from './env-settings';

@Injectable({
  providedIn: 'root'
})
export class EnvSettingsService {
    public settings: EnvSettings;

    constructor() {
        this.settings = new EnvSettings();
    }
}
