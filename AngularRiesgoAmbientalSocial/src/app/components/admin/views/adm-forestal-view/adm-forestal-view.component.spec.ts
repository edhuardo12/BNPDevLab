import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmForestalViewComponent } from './adm-forestal-view.component';

describe('AdmForestalViewComponent', () => {
  let component: AdmForestalViewComponent;
  let fixture: ComponentFixture<AdmForestalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmForestalViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmForestalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
