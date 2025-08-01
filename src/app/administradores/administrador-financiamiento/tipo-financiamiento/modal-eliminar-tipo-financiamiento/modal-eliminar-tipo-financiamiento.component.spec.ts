import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarTipoFinanciamientoComponent } from './modal-eliminar-tipo-financiamiento.component';

describe('ModalEliminarTipoFinanciamientoComponent', () => {
  let component: ModalEliminarTipoFinanciamientoComponent;
  let fixture: ComponentFixture<ModalEliminarTipoFinanciamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarTipoFinanciamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarTipoFinanciamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
