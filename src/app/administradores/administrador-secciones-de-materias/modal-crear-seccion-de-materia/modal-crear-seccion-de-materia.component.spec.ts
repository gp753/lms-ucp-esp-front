import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearSeccionDeMateriaComponent } from './modal-crear-seccion-de-materia.component';

describe('ModalCrearSeccionDeMateriaComponent', () => {
  let component: ModalCrearSeccionDeMateriaComponent;
  let fixture: ComponentFixture<ModalCrearSeccionDeMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCrearSeccionDeMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearSeccionDeMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
