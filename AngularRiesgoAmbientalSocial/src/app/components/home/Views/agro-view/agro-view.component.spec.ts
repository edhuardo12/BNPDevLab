import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgroViewComponent } from './agro-view.component';

describe('AgroViewComponent', () => {
  let component: AgroViewComponent;
  let fixture: ComponentFixture<AgroViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgroViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
