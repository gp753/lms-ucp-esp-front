import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarSubunidadComponent } from './modal-eliminar-subunidad.component';

describe('ModalEliminarSubunidadComponent', () => {
  let component: ModalEliminarSubunidadComponent;
  let fixture: ComponentFixture<ModalEliminarSubunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarSubunidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarSubunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
