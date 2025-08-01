import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarMateriaComponent } from './modal-eliminar-materia.component';

describe('ModalEliminarMateriaComponent', () => {
  let component: ModalEliminarMateriaComponent;
  let fixture: ComponentFixture<ModalEliminarMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
