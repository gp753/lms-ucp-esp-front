import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRealizarEncuestaComponent } from './modal-realizar-encuesta.component';

describe('ModalRealizarEncuestaComponent', () => {
  let component: ModalRealizarEncuestaComponent;
  let fixture: ComponentFixture<ModalRealizarEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRealizarEncuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRealizarEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
