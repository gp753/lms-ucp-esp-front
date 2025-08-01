import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoModalAvisoPreExamenComponent } from './alumno-modal-aviso-pre-examen.component';

describe('AlumnoModalAvisoPreExamenComponent', () => {
  let component: AlumnoModalAvisoPreExamenComponent;
  let fixture: ComponentFixture<AlumnoModalAvisoPreExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoModalAvisoPreExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoModalAvisoPreExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
