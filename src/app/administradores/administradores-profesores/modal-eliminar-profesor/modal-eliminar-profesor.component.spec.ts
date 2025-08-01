import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarProfesorComponent } from './modal-eliminar-profesor.component';

describe('ModalEliminarProfesorComponent', () => {
  let component: ModalEliminarProfesorComponent;
  let fixture: ComponentFixture<ModalEliminarProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarProfesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
