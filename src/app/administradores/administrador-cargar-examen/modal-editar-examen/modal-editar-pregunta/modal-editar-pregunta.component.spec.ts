import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarPreguntaComponent } from './modal-editar-pregunta.component';

describe('ModalEditarPreguntaComponent', () => {
  let component: ModalEditarPreguntaComponent;
  let fixture: ComponentFixture<ModalEditarPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarPreguntaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
