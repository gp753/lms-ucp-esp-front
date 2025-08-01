import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarTipoFinanciamientoComponent } from './modal-editar-tipo-financiamiento.component';

describe('ModalEditarTipoFinanciamientoComponent', () => {
  let component: ModalEditarTipoFinanciamientoComponent;
  let fixture: ComponentFixture<ModalEditarTipoFinanciamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarTipoFinanciamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarTipoFinanciamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
