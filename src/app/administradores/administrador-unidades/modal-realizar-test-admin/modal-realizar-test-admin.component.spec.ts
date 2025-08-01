import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRealizarTestAdminComponent } from './modal-realizar-test-admin.component';

describe('ModalRealizarTestAdminComponent', () => {
  let component: ModalRealizarTestAdminComponent;
  let fixture: ComponentFixture<ModalRealizarTestAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRealizarTestAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRealizarTestAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
