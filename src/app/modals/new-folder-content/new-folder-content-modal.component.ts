import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-new-folder-content',
    templateUrl: './new-folder-content-modal.component.html',
    styleUrls: ['./new-folder-content-modal.component.scss']
})
export class NewFolderContentModal implements OnInit {
    folderForm: FormGroup;

    @Input() folderName: string;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.folderForm = this.formBuilder.group({
            folderName: ['', Validators.required]
        });
    }

    closeModal() {
        this.activeModal.close('Modal Closed');
    }

    createDir() {
        this.activeModal.close(this.folderForm.value);
    }
}
