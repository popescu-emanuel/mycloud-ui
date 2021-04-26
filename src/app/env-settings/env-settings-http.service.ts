import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvSettings} from './env-settings';
import {EnvSettingsService} from './env-settings.service';

@Injectable({
    providedIn: 'root'
})
export class EnvSettingsHttpService {
    constructor(private http: HttpClient, private settingsService: EnvSettingsService) {
    }

    initializeApp(): Promise<any> {

        return new Promise(
            (resolve) => {
                this.http.get('assets/settings.json')
                    .toPromise()
                    .then(response => {
                            this.settingsService.settings = response as EnvSettings;
                            resolve();
                        }
                    );
            }
        );
    }
}
