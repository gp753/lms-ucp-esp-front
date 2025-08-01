import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarSeccionDeMateriaComponent } from './modal-editar-seccion-de-materia.component';

describe('ModalEditarSeccionDeMateriaComponent', () => {
  let component: ModalEditarSeccionDeMateriaComponent;
  let fixture: ComponentFixture<ModalEditarSeccionDeMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarSeccionDeMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarSeccionDeMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
