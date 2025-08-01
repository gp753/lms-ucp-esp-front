import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorConfiguracionDeCertificadoComponent } from './administrador-configuracion-de-certificado.component';

describe('AdministradorConfiguracionDeCertificadoComponent', () => {
  let component: AdministradorConfiguracionDeCertificadoComponent;
  let fixture: ComponentFixture<AdministradorConfiguracionDeCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorConfiguracionDeCertificadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorConfiguracionDeCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
