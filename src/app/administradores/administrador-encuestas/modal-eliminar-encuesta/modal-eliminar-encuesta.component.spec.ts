import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarEncuestaComponent } from './modal-eliminar-encuesta.component';

describe('ModalEliminarEncuestaComponent', () => {
  let component: ModalEliminarEncuestaComponent;
  let fixture: ComponentFixture<ModalEliminarEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarEncuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
