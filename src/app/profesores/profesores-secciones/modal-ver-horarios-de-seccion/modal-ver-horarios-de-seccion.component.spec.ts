import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerHorariosDeSeccionComponent } from './modal-ver-horarios-de-seccion.component';

describe('ModalVerHorariosDeSeccionComponent', () => {
  let component: ModalVerHorariosDeSeccionComponent;
  let fixture: ComponentFixture<ModalVerHorariosDeSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVerHorariosDeSeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerHorariosDeSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
