import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {EnvSettings} from './env-settings';

@Injectable()
export class EnvSettingsHttpService {

    settings: EnvSettings;

    constructor(private http: HttpClient) {
    }

    initializeApp(): Promise<any> {
        console.log('Returning promise...');
        this.http.get('assets/environment.json').subscribe(data => console.log('Data ' + data));
        return new Promise(
            (resolve) => {
                this.http.get('assets/environment.json')
                    .toPromise()
                    .then(response => {
                            console.log('Loading assets');
                            this.settings = response as EnvSettings;
                            console.log('Loaded assets ' + response);
                            resolve();
                        }
                    );
            }
        );
    }

    public get baseUrl() {
        return 'http://' + this.settings.apiUrl + ':' + this.settings.apiPort;
    }
}
