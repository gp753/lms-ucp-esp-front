import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarRolComponent } from './modal-eliminar-rol.component';

describe('ModalEliminarRolComponent', () => {
  let component: ModalEliminarRolComponent;
  let fixture: ComponentFixture<ModalEliminarRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarRolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
