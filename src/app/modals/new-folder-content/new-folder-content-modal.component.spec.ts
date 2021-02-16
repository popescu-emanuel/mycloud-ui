import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFolderContentModal } from './new-folder-content-modal.component';

describe('NewFolderContentComponent', () => {
  let component: NewFolderContentModal;
  let fixture: ComponentFixture<NewFolderContentModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFolderContentModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFolderContentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
