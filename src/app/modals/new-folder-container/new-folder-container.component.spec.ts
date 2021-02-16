import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFolderContainerComponent } from './new-folder-container.component';

describe('NewFolderContainerComponent', () => {
  let component: NewFolderContainerComponent;
  let fixture: ComponentFixture<NewFolderContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFolderContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFolderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
