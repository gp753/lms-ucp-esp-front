import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarForoComponent } from './modal-editar-foro.component';

describe('ModalEditarForoComponent', () => {
  let component: ModalEditarForoComponent;
  let fixture: ComponentFixture<ModalEditarForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarForoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
