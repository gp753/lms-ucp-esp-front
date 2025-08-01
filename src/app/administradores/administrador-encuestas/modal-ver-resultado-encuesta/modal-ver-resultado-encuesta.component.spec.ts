import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerResultadoEncuestaComponent } from './modal-ver-resultado-encuesta.component';

describe('ModalVerResultadoEncuestaComponent', () => {
  let component: ModalVerResultadoEncuestaComponent;
  let fixture: ComponentFixture<ModalVerResultadoEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVerResultadoEncuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerResultadoEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
