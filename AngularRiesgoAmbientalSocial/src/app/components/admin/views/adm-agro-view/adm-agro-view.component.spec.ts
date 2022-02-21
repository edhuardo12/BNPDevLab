import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmAgroViewComponent } from './adm-agro-view.component';

describe('AdmAgroViewComponent', () => {
  let component: AdmAgroViewComponent;
  let fixture: ComponentFixture<AdmAgroViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmAgroViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmAgroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
