import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarGrupoComponent } from './modal-editar-grupo.component';

describe('ModalEditarGrupoComponent', () => {
  let component: ModalEditarGrupoComponent;
  let fixture: ComponentFixture<ModalEditarGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
