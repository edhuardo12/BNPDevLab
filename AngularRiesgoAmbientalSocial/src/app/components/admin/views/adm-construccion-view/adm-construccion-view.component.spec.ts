import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmConstruccionViewComponent } from './adm-construccion-view.component';

describe('AdmConstruccionViewComponent', () => {
  let component: AdmConstruccionViewComponent;
  let fixture: ComponentFixture<AdmConstruccionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmConstruccionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmConstruccionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
