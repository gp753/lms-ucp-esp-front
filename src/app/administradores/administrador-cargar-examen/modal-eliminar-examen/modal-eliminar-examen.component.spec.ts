import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarExamenComponent } from './modal-eliminar-examen.component';

describe('ModalEliminarExamenComponent', () => {
  let component: ModalEliminarExamenComponent;
  let fixture: ComponentFixture<ModalEliminarExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
