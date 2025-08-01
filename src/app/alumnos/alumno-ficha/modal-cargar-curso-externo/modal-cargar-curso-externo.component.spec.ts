import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCargarCursoExternoComponent } from './modal-cargar-curso-externo.component';

describe('ModalCargarCursoExternoComponent', () => {
  let component: ModalCargarCursoExternoComponent;
  let fixture: ComponentFixture<ModalCargarCursoExternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCargarCursoExternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCargarCursoExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
