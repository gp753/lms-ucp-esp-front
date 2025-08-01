import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarEncuestaComponent } from './modal-editar-encuesta.component';

describe('ModalEditarEncuestaComponent', () => {
  let component: ModalEditarEncuestaComponent;
  let fixture: ComponentFixture<ModalEditarEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarEncuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
