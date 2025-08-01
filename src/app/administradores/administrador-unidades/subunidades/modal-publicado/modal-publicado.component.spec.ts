import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPublicadoComponent } from './modal-publicado.component';

describe('ModalPublicadoComponent', () => {
  let component: ModalPublicadoComponent;
  let fixture: ComponentFixture<ModalPublicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPublicadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPublicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
