import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoRendirExamenComponent } from './alumno-rendir-examen.component';

describe('AlumnoRendirExamenComponent', () => {
  let component: AlumnoRendirExamenComponent;
  let fixture: ComponentFixture<AlumnoRendirExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoRendirExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoRendirExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
