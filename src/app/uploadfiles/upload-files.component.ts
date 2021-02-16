import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CloudService} from '../_services/cloud.service';
import {EmitSignal} from "../_signals/EmitSignal";
import {EmitSignalType} from "../_signals/EmitSignalType";
import {UploadFileSpecification} from "../_models/uploadFileSpecification";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewFolderContentModal} from "../modals/new-folder-content/new-folder-content-modal.component";
import {SimpleFileSpecification} from "../_models/simpleFileSpecification";
import {DirectorySpecification} from "../_models/directorySpecification";
import {FileResponse} from "../_models/fileResponse";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-uploadfiles',
    templateUrl: './upload-files.component.html',
    styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit, AfterViewInit, OnChanges {

    @Output() emit = new EventEmitter<Observable<FileResponse[]>>();
    @Input() breadcrumb = new Array<string>();

    fileInfos: Observable<FileResponse[]>;

    isFolder: boolean;
    inputLabelText: string;
    selectedFiles: FileList;
    progress = 0;
    message = '';
    public currentFile: File;

    constructor(
        private cloudService: CloudService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
        this.fileInfos = this.cloudService.listFolder(this.breadcrumb);
        this.inputLabelText = 'Choose file';
    }

    ngOnChanges(): void {

    }

    ngAfterViewInit(): void {

    }

    selectFile(event) {
        this.selectedFiles = event.target.files;
        this.setBehaviourOnFileSelection();

        this.inputLabelText = event.target.files.length + ' files selected';
        console.log('Current breadcrumb: ' + this.breadcrumb);

        const filenames = Array.from(this.selectedFiles).map(file => file.name);
        console.log('Filenames: ' + filenames);
    }

    private setBehaviourOnFileSelection() {
        let uploadButton = document.getElementById('inputGroupFileAddon01');
        let cleanButton = document.getElementById('inputGroupFileClean');
        if (this.selectedFiles.length != 0) {
            uploadButton.classList.replace('btn-unavailable', 'btn-input');
            cleanButton.classList.replace('btn-unavailable', 'btn-input');
        }
    }

    upload() {
        console.log('Upload breadcrumb ' + this.breadcrumb);
        this.progress = 0;
        Array.from(this.selectedFiles).forEach(currentFile => {

            this.currentFile = currentFile;
            let cf = new UploadFileSpecification();
            cf.file = currentFile;

            cf.breadcrumb = new Array<string>();
            this.breadcrumb.forEach(value => {
                cf.breadcrumb.push(value)
            });

            this.cloudService.upload(cf).subscribe(
                event => {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.progress = Math.round(100 * event.loaded / event.total);
                    } else if (event instanceof HttpResponse) {
                        this.message = event.body.message;
                        this.fileInfos = this.cloudService.list();
                        this.emit.emit(this.fileInfos);
                    }
                },
                err => {
                    this.progress = 0;
                    this.message = 'Could not upload the file!';
                });
        });
        this.selectedFiles = undefined;
    }

    clean() {

    }

    openFormModal() {
        const modalRef = this.modalService.open(NewFolderContentModal);

        modalRef.result.then((result) => {
            console.log('Folder name: ' + result.folderName);
            let fs = new DirectorySpecification();
            fs.folderName = result.folderName;
            fs.breadcrumb = this.breadcrumb;
            this.cloudService.createDir(fs).subscribe(
                data => {
                    console.log('Dir created');
                }, error => {
                    console.log('Dir could not be created ' + error);
                }
            );
        }).catch((error) => {
            console.log('Closed: ' + error);
        });
    }
}
