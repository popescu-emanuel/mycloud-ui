import { Component, OnInit } from '@angular/core';
import { NewFolderContentModal } from '../new-folder-content/new-folder-content-modal.component';
import { ModalModule } from 'ngb-modal';

@Component({
  selector: 'app-new-folder-container',
  templateUrl: './new-folder-container.component.html',
  styleUrls: ['./new-folder-container.component.scss']
})
export class NewFolderContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
