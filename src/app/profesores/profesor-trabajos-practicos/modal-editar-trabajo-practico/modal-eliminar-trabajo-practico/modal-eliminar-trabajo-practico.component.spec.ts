import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarTrabajoPracticoComponent } from './modal-eliminar-trabajo-practico.component';

describe('ModalEliminarTrabajoPracticoComponent', () => {
  let component: ModalEliminarTrabajoPracticoComponent;
  let fixture: ComponentFixture<ModalEliminarTrabajoPracticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarTrabajoPracticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarTrabajoPracticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
