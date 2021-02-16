import {Injectable} from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    signOut() {
        window.sessionStorage.clear();
    }

    public saveToken(token: string) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
        console.log('Set token' + sessionStorage.getItem(TOKEN_KEY));

    }

    public getToken(): string {
        console.log('Get token' + sessionStorage.getItem(TOKEN_KEY));
        return sessionStorage.getItem(TOKEN_KEY);
    }

    public saveUser(user) {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        console.log('Save user' + JSON.stringify(user));
    }

    public getUser() {
        console.log('Get user' + sessionStorage.getItem(USER_KEY));
        return JSON.parse(sessionStorage.getItem(USER_KEY));
    }
}
