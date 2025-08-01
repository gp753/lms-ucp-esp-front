import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarGrupoComponent } from './modal-eliminar-grupo.component';

describe('ModalEliminarGrupoComponent', () => {
  let component: ModalEliminarGrupoComponent;
  let fixture: ComponentFixture<ModalEliminarGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
