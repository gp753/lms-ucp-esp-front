import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRealizarTestAlumnoComponent } from './modal-realizar-test-alumno.component';

describe('ModalRealizarTestAlumnoComponent', () => {
  let component: ModalRealizarTestAlumnoComponent;
  let fixture: ComponentFixture<ModalRealizarTestAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRealizarTestAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRealizarTestAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
