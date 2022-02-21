import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoAnalistaComponent } from './historico-analista.component';

describe('HistoricoAnalistaComponent', () => {
  let component: HistoricoAnalistaComponent;
  let fixture: ComponentFixture<HistoricoAnalistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoAnalistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoAnalistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
