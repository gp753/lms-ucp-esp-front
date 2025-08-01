import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoMateriasTabSieteComponent } from './alumno-materias-tab-siete.component';

describe('AlumnoMateriasTabSieteComponent', () => {
  let component: AlumnoMateriasTabSieteComponent;
  let fixture: ComponentFixture<AlumnoMateriasTabSieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoMateriasTabSieteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoMateriasTabSieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
