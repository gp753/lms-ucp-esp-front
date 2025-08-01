import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoExamenesComponent } from './alumno-examenes.component';

describe('AlumnoExamenesComponent', () => {
  let component: AlumnoExamenesComponent;
  let fixture: ComponentFixture<AlumnoExamenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoExamenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
