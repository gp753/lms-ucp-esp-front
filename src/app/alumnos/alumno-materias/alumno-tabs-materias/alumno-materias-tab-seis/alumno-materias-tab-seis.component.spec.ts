import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoMateriasTabSeisComponent } from './alumno-materias-tab-seis.component';

describe('AlumnoMateriasTabSeisComponent', () => {
  let component: AlumnoMateriasTabSeisComponent;
  let fixture: ComponentFixture<AlumnoMateriasTabSeisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoMateriasTabSeisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoMateriasTabSeisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
