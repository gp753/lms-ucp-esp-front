import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarRespuestaComponent } from './modal-editar-respuesta.component';

describe('ModalEditarRespuestaComponent', () => {
  let component: ModalEditarRespuestaComponent;
  let fixture: ComponentFixture<ModalEditarRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarRespuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
