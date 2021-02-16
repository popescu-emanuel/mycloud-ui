import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../_models/user';
import {environment} from "../../environments/environment";

const API_URL = environment.baseUrl + '/api/';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(API_URL + `users`);
    }

    getById(id: number) {
        return this.http.get<User>(API_URL + `users/${id}`);
    }
}
