import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmGeneralViewComponent } from './adm-general-view.component';

describe('AdmGeneralViewComponent', () => {
  let component: AdmGeneralViewComponent;
  let fixture: ComponentFixture<AdmGeneralViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmGeneralViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmGeneralViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
