import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorResultadosEcuestasComponent } from './administrador-resultados-ecuestas.component';

describe('AdministradorResultadosEcuestasComponent', () => {
  let component: AdministradorResultadosEcuestasComponent;
  let fixture: ComponentFixture<AdministradorResultadosEcuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorResultadosEcuestasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorResultadosEcuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
