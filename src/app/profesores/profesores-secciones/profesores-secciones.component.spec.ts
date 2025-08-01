import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresSeccionesComponent } from './profesores-secciones.component';

describe('ProfesoresSeccionesComponent', () => {
  let component: ProfesoresSeccionesComponent;
  let fixture: ComponentFixture<ProfesoresSeccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesoresSeccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesoresSeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
