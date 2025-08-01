import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarSubunidadComponent } from './modal-editar-subunidad.component';

describe('ModalEditarSubunidadComponent', () => {
  let component: ModalEditarSubunidadComponent;
  let fixture: ComponentFixture<ModalEditarSubunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarSubunidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarSubunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
