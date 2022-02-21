import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialViewComponent } from './industrial-view.component';

describe('IndustrialViewComponent', () => {
  let component: IndustrialViewComponent;
  let fixture: ComponentFixture<IndustrialViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustrialViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
