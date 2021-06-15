/* tslint:disable:prefer-const */
import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {CloudService} from '../_services/cloud.service';
import {FileResponse} from '../_models/fileResponse';
import {SimpleFileSpecification} from '../_models/simpleFileSpecification';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit, OnChanges {

    @Output() onUpdate = new EventEmitter<Array<string>>();
    @Input() eventInput: Observable<FileResponse[]>;

    filteredList: FileResponse[];
    files: FileResponse[];
    breadcrumb: string[] = [];

    @ViewChild('searchTableInput') searchTableInput: ElementRef;

    constructor(
        private authService: AuthService,
        private cloudService: CloudService
    ) {
    }

    ngOnInit(): void {
        this.cloudService.list().subscribe(
            data => {
                console.log('Successfully retrieved data');
                this.files = data;
                this.filteredList = this.files;
            }, error => {
                console.log('Error retrieving data');
                this.files = [];
                this.filteredList = [];
            }
        );
    }

    ngOnChanges(): void {
        console.log('File list was updated ' + this.eventInput);
        this.eventInput.subscribe(
            data => {
                console.log('Successfully retrieved data');
                this.files = data;
                this.doRefreshList();
            }, error => {
                console.log('Error retrieving data');
                this.files = [];
                this.doRefreshList();
            }
        );
    }

    doRefreshList() {
        console.log('Refresh list');

        this.cloudService.listFolder(this.breadcrumb).subscribe(
            data => {
                this.files = data;
                const filenames = this.files.map(file => file.filename);

                console.log('Files ' + filenames);

                if (this.isEmptyFileList()) {
                    console.log('There are no fields available');
                    this.files = undefined;
                }
            }, err => {
                console.log(err);
            }
        );
    }

    delete(file: FileResponse) {
        console.log('Trying to delete ' + file);

        let fs = new SimpleFileSpecification();
        fs.breadcrumb = this.breadcrumb;

        if (!this.isFolder(file)) {
            fs.filename = file.filename + '.' + file.type;
        } else {
            fs.filename = file.filename;
        }

        this.cloudService.delete(fs)
            .subscribe(
                data => {
                    console.log(data);
                    this.doRefreshList();
                },
                err => {
                    console.log(err);
                    this.doRefreshList();
                });
    }

    download(file: FileResponse) {
        console.log('Trying to download ' + file);

        let fs = new SimpleFileSpecification();
        fs.breadcrumb = this.breadcrumb;

        if (!this.isFolder(file)) {
            fs.filename = file.filename + '.' + file.type;
        } else {
            fs.filename = file.filename;
        }

        this.cloudService.download(fs)
            .subscribe(
                (response: any) => {
                    console.log('File ' + file + ' successfully downloaded');
                    this.extractDataAsFile(response, file.filename + '.' + file.type);
                },
                err => {
                    console.log(err);
                });
    }

    private extractDataAsFile(response: any, filename: string) {
        const dataType = response.type;
        const binaryData = [];
        binaryData.push(response);

        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (filename) {
            downloadLink.setAttribute('download', filename);
        }
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
    }

    public filesLength() {
        if (Array.isArray(this.filteredList)) {
            return this.filteredList.length;
        } else {
            console.log('Files has unknown type');
            return 0;
        }
    }

    public isEmptyFileList() {
        return this.filteredList && this.filesLength() === 0;
    }

    public isFolder(file: FileResponse) {
        if (file) {
            return file.type === 'folder';
        } else {
            console.log('Folder check could not be performed, invalid input data');
        }
    }

    openFolder(file: FileResponse) {
        console.log('Try to open folder ' + file.filename);
        if (this.isFolder(file)) {
            this.breadcrumb.push(file.filename);
            this.cloudService.listFolder(this.breadcrumb).subscribe(
                data => {
                    this.files = data;
                }, err => {
                    console.log(err);
                }
            );
            this.onUpdate.emit(this.breadcrumb);
        }
    }

    back() {
        this.breadcrumb.pop();
        this.onUpdate.emit(this.breadcrumb);
        this.doRefreshList();
    }

    getIcon(file: FileResponse) {
        let response = '';
        switch (file.type) {
            case 'folder':
                response = 'fa fa-folder fa-colored';
                break;

            case 'jpg':
            case 'jpeg':
                response = 'fa fa-file-image-o fa-colored';
                break;

            case 'pdf':
                response = 'fa fa-file-pdf-o fa-colored';
                break;

            case 'txt':
                response = 'fa fa-file-word-o fa-colored';
                break;

            default:
                response = 'fa fa-file-alt fa-colored';
        }
        return response;
    }

    filterList($event: Event) {
        let filterValue = (document.getElementById('searchTableInput') as HTMLInputElement).value;
        if (filterValue === '') {
            this.filteredList = this.files;
            return;
        }
        filterValue = filterValue.toLowerCase();
        this.filteredList = this.files
            .filter(file =>
                file.filename
                    .trim()
                    .toLowerCase()
                    .includes(filterValue)
            );
    }
}
