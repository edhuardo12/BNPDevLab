import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmClasificationViewComponent } from './adm-clasification-view.component';

describe('AdmClasificationViewComponent', () => {
  let component: AdmClasificationViewComponent;
  let fixture: ComponentFixture<AdmClasificationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmClasificationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmClasificationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
