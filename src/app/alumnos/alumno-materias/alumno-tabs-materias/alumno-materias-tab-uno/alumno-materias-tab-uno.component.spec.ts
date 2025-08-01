import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoMateriasTabUnoComponent } from './alumno-materias-tab-uno.component';

describe('AlumnoMateriasTabUnoComponent', () => {
  let component: AlumnoMateriasTabUnoComponent;
  let fixture: ComponentFixture<AlumnoMateriasTabUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoMateriasTabUnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoMateriasTabUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
