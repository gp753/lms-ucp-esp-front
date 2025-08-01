import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLinkMaterialesComponent } from './modal-link-materiales.component';

describe('ModalLinkMaterialesComponent', () => {
  let component: ModalLinkMaterialesComponent;
  let fixture: ComponentFixture<ModalLinkMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLinkMaterialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLinkMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
