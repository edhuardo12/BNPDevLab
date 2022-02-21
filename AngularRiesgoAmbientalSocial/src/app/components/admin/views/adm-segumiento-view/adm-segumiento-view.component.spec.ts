import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmSegumientoViewComponent } from './adm-segumiento-view.component';

describe('AdmSegumientoViewComponent', () => {
  let component: AdmSegumientoViewComponent;
  let fixture: ComponentFixture<AdmSegumientoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmSegumientoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmSegumientoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
