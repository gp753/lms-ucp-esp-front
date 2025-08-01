import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorCertificadosComponent } from './administrador-certificados.component';

describe('AdministradorCertificadosComponent', () => {
  let component: AdministradorCertificadosComponent;
  let fixture: ComponentFixture<AdministradorCertificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorCertificadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorCertificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
