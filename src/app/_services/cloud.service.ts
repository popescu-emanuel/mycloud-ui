import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileResponse} from '../_models/fileResponse';
import {DirectorySpecification} from '../_models/directorySpecification';
import {UploadFileSpecification} from '../_models/uploadFileSpecification';
import {SimpleFileSpecification} from '../_models/simpleFileSpecification';
import {ResetPasswordRequest} from '../_models/reset-password-request';
import {environment} from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class CloudService {

    private API_URL: string = environment.baseUrl;

    constructor(private http: HttpClient) {
        this.API_URL = this.API_URL + '/api/cloud';
    }

    list(): Observable<FileResponse[]> {
        const endpoint = this.API_URL + '/list';
        console.log('Calling ' + endpoint);
        return this.http.get<FileResponse[]>(endpoint);
    }


    listFolder(breadcrumb: Array<string>): Observable<FileResponse[]> {
        const dirSpecs: DirectorySpecification = new DirectorySpecification();

        dirSpecs.folderName = '';
        dirSpecs.breadcrumb = breadcrumb;

        const URL = this.API_URL + '/list';

        return this.http.post<FileResponse[]>(URL, dirSpecs);
    }

    upload(fileSpecs: UploadFileSpecification): Observable<any> {
        const endpoint = this.API_URL + '/upload';

        const formData = new FormData();
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
        const endpoint = this.API_URL + '/createdir';
        console.log('Calling ' + endpoint);
        console.log(fs);

        return this.http.post<any>(endpoint, fs);
    }

    delete(fs: SimpleFileSpecification): Observable<any> {
        const endpoint = this.API_URL + '/delete';
        console.log('Calling ' + endpoint);
        return this.http.post(endpoint, fs);
    }

    download(fs: SimpleFileSpecification): Observable<any> {
        const endpoint = this.API_URL + '/download';
        console.log('Calling ' + endpoint);
        return this.http.post<any>(endpoint, fs, {
            reportProgress: true,
            responseType: 'blob' as 'json'
        });
    }

    resetPassword(rpr: ResetPasswordRequest): Observable<any> {
        const endpoint = this.API_URL + '/reset';
        console.log('Calling ' + endpoint);
        return this.http.post<any>(endpoint, rpr);
    }

    getMemoryAllocation(): Observable<any> {
        const endpoint = this.API_URL + '/size';
        console.log('Calling ' + endpoint);
        return this.http.post(endpoint, {});
    }

}
