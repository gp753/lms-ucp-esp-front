import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorSeccionesDeMateriasComponent } from './administrador-secciones-de-materias.component';

describe('AdministradorSeccionesDeMateriasComponent', () => {
  let component: AdministradorSeccionesDeMateriasComponent;
  let fixture: ComponentFixture<AdministradorSeccionesDeMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorSeccionesDeMateriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorSeccionesDeMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
