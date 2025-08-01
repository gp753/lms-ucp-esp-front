import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarCursoExternoAdministradorComponent } from './modal-agregar-curso-externo-administrador.component';

describe('ModalAgregarCursoExternoAdministradorComponent', () => {
  let component: ModalAgregarCursoExternoAdministradorComponent;
  let fixture: ComponentFixture<ModalAgregarCursoExternoAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarCursoExternoAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarCursoExternoAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
