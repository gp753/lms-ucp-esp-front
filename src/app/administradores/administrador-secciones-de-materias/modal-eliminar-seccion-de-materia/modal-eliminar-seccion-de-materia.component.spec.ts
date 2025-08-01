import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarSeccionDeMateriaComponent } from './modal-eliminar-seccion-de-materia.component';

describe('ModalEliminarSeccionDeMateriaComponent', () => {
  let component: ModalEliminarSeccionDeMateriaComponent;
  let fixture: ComponentFixture<ModalEliminarSeccionDeMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarSeccionDeMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarSeccionDeMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
