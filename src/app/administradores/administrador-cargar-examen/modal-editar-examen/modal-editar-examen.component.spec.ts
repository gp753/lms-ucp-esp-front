import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarExamenComponent } from './modal-editar-examen.component';

describe('ModalEditarExamenComponent', () => {
  let component: ModalEditarExamenComponent;
  let fixture: ComponentFixture<ModalEditarExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
