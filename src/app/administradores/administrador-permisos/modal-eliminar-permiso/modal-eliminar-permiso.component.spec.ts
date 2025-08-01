import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarPermisoComponent } from './modal-eliminar-permiso.component';

describe('ModalEliminarPermisoComponent', () => {
  let component: ModalEliminarPermisoComponent;
  let fixture: ComponentFixture<ModalEliminarPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarPermisoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
