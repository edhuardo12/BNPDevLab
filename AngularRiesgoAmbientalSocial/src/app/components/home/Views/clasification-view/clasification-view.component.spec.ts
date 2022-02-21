import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificationViewComponent } from './clasification-view.component';

describe('ClasificationViewComponent', () => {
  let component: ClasificationViewComponent;
  let fixture: ComponentFixture<ClasificationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasificationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
