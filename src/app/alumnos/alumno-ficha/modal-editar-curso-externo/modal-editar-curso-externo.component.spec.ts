import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarCursoExternoComponent } from './modal-editar-curso-externo.component';

describe('ModalEditarCursoExternoComponent', () => {
  let component: ModalEditarCursoExternoComponent;
  let fixture: ComponentFixture<ModalEditarCursoExternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarCursoExternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarCursoExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
