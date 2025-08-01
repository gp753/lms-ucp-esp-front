import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarForoComponent } from './modal-eliminar-foro.component';

describe('ModalEliminarForoComponent', () => {
  let component: ModalEliminarForoComponent;
  let fixture: ComponentFixture<ModalEliminarForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarForoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
