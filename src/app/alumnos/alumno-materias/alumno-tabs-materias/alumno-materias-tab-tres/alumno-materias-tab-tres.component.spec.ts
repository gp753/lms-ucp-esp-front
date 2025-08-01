import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoMateriasTabTresComponent } from './alumno-materias-tab-tres.component';

describe('AlumnoMateriasTabTresComponent', () => {
  let component: AlumnoMateriasTabTresComponent;
  let fixture: ComponentFixture<AlumnoMateriasTabTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoMateriasTabTresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoMateriasTabTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
