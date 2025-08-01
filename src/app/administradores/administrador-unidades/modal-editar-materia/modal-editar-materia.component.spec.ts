import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarMateriaComponent } from './modal-editar-materia.component';

describe('ModalEditarMateriaComponent', () => {
  let component: ModalEditarMateriaComponent;
  let fixture: ComponentFixture<ModalEditarMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
