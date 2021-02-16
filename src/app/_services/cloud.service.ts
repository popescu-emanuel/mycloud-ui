import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileResponse} from '../_models/fileResponse';
import {DirectorySpecification} from "../_models/directorySpecification";
import {UploadFileSpecification} from "../_models/uploadFileSpecification";
import {SimpleFileSpecification} from "../_models/simpleFileSpecification";
import {ResetPasswordRequest} from "../_models/reset-password-request";
import {environment} from "../../environments/environment";

const API_URL = environment.baseUrl + '/api/cloud/';

@Injectable({
    providedIn: 'root'
})
export class CloudService {

    constructor(private http: HttpClient) {
    }

    list(): Observable<FileResponse[]> {
        let endpoint = API_URL + 'list';
        console.log('Calling ' + endpoint);
        return this.http.get<FileResponse[]>(endpoint);
    }


    listFolder(breadcrumb: Array<string>): Observable<FileResponse[]> {
        const dirSpecs: DirectorySpecification = new DirectorySpecification();

        dirSpecs.folderName = '';
        dirSpecs.breadcrumb = breadcrumb;

        let URL = API_URL + 'list';

        return this.http.post<FileResponse[]>(URL, dirSpecs);
    }

    upload(fileSpecs: UploadFileSpecification): Observable<any> {
        let endpoint = API_URL + 'upload';

        let formData = new FormData();
        formData.append('file', fileSpecs.file);
        console.log('Before stringify ' + fileSpecs.breadcrumb);

        formData.append('breadcrumb', JSON.parse(JSON.stringify(fileSpecs.breadcrumb)));

        console.log('After stringify ' + JSON.stringify(fileSpecs.breadcrumb));

        return this.http.post<any>(endpoint, formData, {
            reportProgress: true,
            responseType: 'json'
        });
    }

    createDir(fs: DirectorySpecification): Observable<any> {
        let endpoint = API_URL + 'createdir';
        console.log('Calling ' + endpoint);
        console.log(fs);

        return this.http.post<any>(endpoint, fs);
    }

    delete(fs: SimpleFileSpecification): Observable<any> {
        let endpoint = API_URL + 'delete';
        console.log('Calling ' + endpoint);
        return this.http.post(endpoint, fs);
    }

    download(fs: SimpleFileSpecification): Observable<any> {
        let endpoint = API_URL + 'download';
        console.log('Calling ' + endpoint);
        return this.http.post<any>(endpoint, fs, {
            reportProgress: true,
            responseType: 'blob' as 'json'
        });
    }

    resetPassword(rpr: ResetPasswordRequest): Observable<any> {
        let endpoint = API_URL + 'reset';
        console.log('Calling ' + endpoint);
        return this.http.post<any>(endpoint, rpr);
    }


}
