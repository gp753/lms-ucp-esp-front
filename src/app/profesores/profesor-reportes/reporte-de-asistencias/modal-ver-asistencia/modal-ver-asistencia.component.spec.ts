import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerAsistenciaComponent } from './modal-ver-asistencia.component';

describe('ModalVerAsistenciaComponent', () => {
  let component: ModalVerAsistenciaComponent;
  let fixture: ComponentFixture<ModalVerAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVerAsistenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
