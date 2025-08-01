import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarPreguntaEncuestaComponent } from './modal-editar-pregunta-encuesta.component';

describe('ModalEditarPreguntaEncuestaComponent', () => {
  let component: ModalEditarPreguntaEncuestaComponent;
  let fixture: ComponentFixture<ModalEditarPreguntaEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarPreguntaEncuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarPreguntaEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
