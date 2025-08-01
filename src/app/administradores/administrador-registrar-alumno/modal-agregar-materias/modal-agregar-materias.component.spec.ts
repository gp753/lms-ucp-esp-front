import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarMateriasComponent } from './modal-agregar-materias.component';

describe('ModalAgregarMateriasComponent', () => {
  let component: ModalAgregarMateriasComponent;
  let fixture: ComponentFixture<ModalAgregarMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarMateriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
