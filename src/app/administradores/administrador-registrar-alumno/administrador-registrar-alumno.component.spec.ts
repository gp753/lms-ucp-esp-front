import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorRegistrarAlumnoComponent } from './administrador-registrar-alumno.component';

describe('AdministradorRegistrarAlumnoComponent', () => {
  let component: AdministradorRegistrarAlumnoComponent;
  let fixture: ComponentFixture<AdministradorRegistrarAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorRegistrarAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorRegistrarAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
