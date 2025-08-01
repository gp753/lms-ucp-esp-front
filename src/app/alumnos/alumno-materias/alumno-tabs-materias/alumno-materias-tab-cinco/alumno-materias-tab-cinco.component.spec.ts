import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoMateriasTabCincoComponent } from './alumno-materias-tab-cinco.component';

describe('AlumnoMateriasTabCincoComponent', () => {
  let component: AlumnoMateriasTabCincoComponent;
  let fixture: ComponentFixture<AlumnoMateriasTabCincoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoMateriasTabCincoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoMateriasTabCincoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
