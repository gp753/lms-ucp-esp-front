import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarUnidadComponent } from './modal-editar-unidad.component';

describe('ModalEditarUnidadComponent', () => {
  let component: ModalEditarUnidadComponent;
  let fixture: ComponentFixture<ModalEditarUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarUnidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
