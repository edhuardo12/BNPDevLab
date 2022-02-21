import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintGeneralComponent } from './print-general.component';

describe('PrintGeneralComponent', () => {
  let component: PrintGeneralComponent;
  let fixture: ComponentFixture<PrintGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
