import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearGrupoComponent } from './modal-crear-grupo.component';

describe('ModalCrearGrupoComponent', () => {
  let component: ModalCrearGrupoComponent;
  let fixture: ComponentFixture<ModalCrearGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCrearGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
