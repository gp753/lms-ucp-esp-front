import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerResultadoAlumnoEncuestaComponent } from './modal-ver-resultado-alumno-encuesta.component';

describe('ModalVerResultadoAlumnoEncuestaComponent', () => {
  let component: ModalVerResultadoAlumnoEncuestaComponent;
  let fixture: ComponentFixture<ModalVerResultadoAlumnoEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVerResultadoAlumnoEncuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerResultadoAlumnoEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
