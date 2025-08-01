import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarAlumnoDelFinanciamientoComponent } from './modal-eliminar-alumno-del-financiamiento.component';

describe('ModalEliminarAlumnoDelFinanciamientoComponent', () => {
  let component: ModalEliminarAlumnoDelFinanciamientoComponent;
  let fixture: ComponentFixture<ModalEliminarAlumnoDelFinanciamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarAlumnoDelFinanciamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarAlumnoDelFinanciamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
