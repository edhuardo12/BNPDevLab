import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmniturnoSumaryComponent } from './omniturno-sumary.component';

describe('OmniturnoSumaryComponent', () => {
  let component: OmniturnoSumaryComponent;
  let fixture: ComponentFixture<OmniturnoSumaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmniturnoSumaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OmniturnoSumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
