import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarUnidadComponent } from './modal-eliminar-unidad.component';

describe('ModalEliminarUnidadComponent', () => {
  let component: ModalEliminarUnidadComponent;
  let fixture: ComponentFixture<ModalEliminarUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarUnidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
