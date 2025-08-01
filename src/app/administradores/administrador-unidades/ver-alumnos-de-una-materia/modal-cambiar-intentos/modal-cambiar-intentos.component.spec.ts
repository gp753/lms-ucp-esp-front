import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCambiarIntentosComponent } from './modal-cambiar-intentos.component';

describe('ModalCambiarIntentosComponent', () => {
  let component: ModalCambiarIntentosComponent;
  let fixture: ComponentFixture<ModalCambiarIntentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCambiarIntentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCambiarIntentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
