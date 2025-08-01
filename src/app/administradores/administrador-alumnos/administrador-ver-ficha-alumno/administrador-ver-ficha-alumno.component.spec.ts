import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorVerFichaAlumnoComponent } from './administrador-ver-ficha-alumno.component';

describe('AdministradorVerFichaAlumnoComponent', () => {
  let component: AdministradorVerFichaAlumnoComponent;
  let fixture: ComponentFixture<AdministradorVerFichaAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorVerFichaAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorVerFichaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
