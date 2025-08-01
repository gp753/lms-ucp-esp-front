import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoMateriasTabCuatroComponent } from './alumno-materias-tab-cuatro.component';

describe('AlumnoMateriasTabCuatroComponent', () => {
  let component: AlumnoMateriasTabCuatroComponent;
  let fixture: ComponentFixture<AlumnoMateriasTabCuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoMateriasTabCuatroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoMateriasTabCuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
