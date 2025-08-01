import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarRespuestaEncuestaComponent } from './modal-editar-respuesta-encuesta.component';

describe('ModalEditarRespuestaEncuestaComponent', () => {
  let component: ModalEditarRespuestaEncuestaComponent;
  let fixture: ComponentFixture<ModalEditarRespuestaEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarRespuestaEncuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarRespuestaEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
