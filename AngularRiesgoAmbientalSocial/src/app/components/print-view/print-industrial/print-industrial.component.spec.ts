import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintIndustrialComponent } from './print-industrial.component';

describe('PrintIndustrialComponent', () => {
  let component: PrintIndustrialComponent;
  let fixture: ComponentFixture<PrintIndustrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintIndustrialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintIndustrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
