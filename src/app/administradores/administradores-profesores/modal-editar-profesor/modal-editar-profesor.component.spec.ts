import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarProfesorComponent } from './modal-editar-profesor.component';

describe('ModalEditarProfesorComponent', () => {
  let component: ModalEditarProfesorComponent;
  let fixture: ComponentFixture<ModalEditarProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarProfesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
