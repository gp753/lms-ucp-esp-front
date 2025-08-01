import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoVerExamenComponent } from './alumno-ver-examen.component';

describe('AlumnoVerExamenComponent', () => {
  let component: AlumnoVerExamenComponent;
  let fixture: ComponentFixture<AlumnoVerExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoVerExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoVerExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
