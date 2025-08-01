import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarCertificadosComponent } from './modal-editar-certificados.component';

describe('ModalEditarCertificadosComponent', () => {
  let component: ModalEditarCertificadosComponent;
  let fixture: ComponentFixture<ModalEditarCertificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarCertificadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarCertificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
