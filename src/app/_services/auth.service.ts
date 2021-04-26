import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models/user';
import {map} from 'rxjs/operators';
import {RoleEnum} from '../_models/roleEnum';
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';

const AUTH_API = environment.baseUrl + '/api/auth/';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const jwtHelper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        // console.log('Current user value: ' + this.currentUserSubject.value);
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        console.log('Calling ' + environment.baseUrl);
        return this.http.post<any>(AUTH_API + `signin`, {email, password})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                console.log('User: ' + user);
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    register(user: User): Observable<any> {
        console.log('Signup call');
        return this.http.post<any>(AUTH_API + 'signup', {email: user.email, password: user.password}, httpOptions);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    get isAuthenticated() {
        return this.currentUserValue != null;
    }

    get isAdmin() {
        if (!this.isAuthenticated) {
            return false;
        }
        return this.currentUserValue.roles.indexOf(RoleEnum.Admin.toString()) > -1;
    }

    isTokenExpired() {
        const token = this.currentUserValue.token;
        return jwtHelper.isTokenExpired(token);
    }

}
