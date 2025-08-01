import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarPermisoComponent } from './modal-editar-permiso.component';

describe('ModalEditarPermisoComponent', () => {
  let component: ModalEditarPermisoComponent;
  let fixture: ComponentFixture<ModalEditarPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarPermisoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
