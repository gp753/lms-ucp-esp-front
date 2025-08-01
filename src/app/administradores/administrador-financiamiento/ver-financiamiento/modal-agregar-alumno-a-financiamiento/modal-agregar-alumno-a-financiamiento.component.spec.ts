import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarAlumnoAFinanciamientoComponent } from './modal-agregar-alumno-a-financiamiento.component';

describe('ModalAgregarAlumnoAFinanciamientoComponent', () => {
  let component: ModalAgregarAlumnoAFinanciamientoComponent;
  let fixture: ComponentFixture<ModalAgregarAlumnoAFinanciamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarAlumnoAFinanciamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarAlumnoAFinanciamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
