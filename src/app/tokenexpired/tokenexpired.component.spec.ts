import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenexpiredComponent } from './tokenexpired.component';

describe('TokenexpiredComponent', () => {
  let component: TokenexpiredComponent;
  let fixture: ComponentFixture<TokenexpiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenexpiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenexpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
