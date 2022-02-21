import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmGanaderoViewComponent } from './adm-ganadero-view.component';

describe('AdmGanaderoViewComponent', () => {
  let component: AdmGanaderoViewComponent;
  let fixture: ComponentFixture<AdmGanaderoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmGanaderoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmGanaderoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
