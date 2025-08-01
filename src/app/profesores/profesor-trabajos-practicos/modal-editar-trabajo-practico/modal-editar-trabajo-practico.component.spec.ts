import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarTrabajoPracticoComponent } from './modal-editar-trabajo-practico.component';

describe('ModalEditarTrabajoPracticoComponent', () => {
  let component: ModalEditarTrabajoPracticoComponent;
  let fixture: ComponentFixture<ModalEditarTrabajoPracticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarTrabajoPracticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarTrabajoPracticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
