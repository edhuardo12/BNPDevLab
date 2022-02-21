import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmIndustrialViewComponent } from './adm-industrial-view.component';

describe('AdmIndustrialViewComponent', () => {
  let component: AdmIndustrialViewComponent;
  let fixture: ComponentFixture<AdmIndustrialViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmIndustrialViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmIndustrialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
