import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoCalificacionesComponent } from './alumno-calificaciones.component';

describe('AlumnoCalificacionesComponent', () => {
  let component: AlumnoCalificacionesComponent;
  let fixture: ComponentFixture<AlumnoCalificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoCalificacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoCalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
