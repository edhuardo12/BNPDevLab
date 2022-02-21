import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintForestalComponent } from './print-forestal.component';

describe('PrintForestalComponent', () => {
  let component: PrintForestalComponent;
  let fixture: ComponentFixture<PrintForestalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintForestalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintForestalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
