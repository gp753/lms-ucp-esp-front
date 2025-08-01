import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarAlumnoComponent } from './modal-eliminar-alumno.component';

describe('ModalEliminarAlumnoComponent', () => {
  let component: ModalEliminarAlumnoComponent;
  let fixture: ComponentFixture<ModalEliminarAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
