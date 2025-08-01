import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoFinanciamientoComponent } from './tipo-financiamiento.component';

describe('TipoFinanciamientoComponent', () => {
  let component: TipoFinanciamientoComponent;
  let fixture: ComponentFixture<TipoFinanciamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoFinanciamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoFinanciamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
