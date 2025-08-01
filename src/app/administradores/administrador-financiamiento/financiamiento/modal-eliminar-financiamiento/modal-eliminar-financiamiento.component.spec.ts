import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarFinanciamientoComponent } from './modal-eliminar-financiamiento.component';

describe('ModalEliminarFinanciamientoComponent', () => {
  let component: ModalEliminarFinanciamientoComponent;
  let fixture: ComponentFixture<ModalEliminarFinanciamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarFinanciamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarFinanciamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
