import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoMateriasTabDosComponent } from './alumno-materias-tab-dos.component';

describe('AlumnoMateriasTabDosComponent', () => {
  let component: AlumnoMateriasTabDosComponent;
  let fixture: ComponentFixture<AlumnoMateriasTabDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoMateriasTabDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoMateriasTabDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
